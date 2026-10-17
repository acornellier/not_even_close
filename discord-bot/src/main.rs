//! Discord `/request` command for Not Even Close data corrections.
//!
//! `/request` opens a modal with the same fields as the GitHub issue form, and submitting it files
//! a `bot-request` issue. From there .github/workflows/request-bot.yml takes over exactly as it
//! does for issues opened on GitHub, so this bot never touches the code.
//!
//! Environment:
//!   DISCORD_TOKEN  bot token
//!   GITHUB_TOKEN   fine-grained token with Issues read/write on the repo
//!   GITHUB_REPO    owner/name, defaults to acornellier/not_even_close

use std::{env, error::Error, sync::Arc};

use serde_json::json;
use twilight_gateway::{Event, EventTypeFlags, Intents, Shard, ShardId, StreamExt as _};
use twilight_http::Client;
use twilight_model::{
    application::{
        command::CommandType,
        interaction::{
            Interaction, InteractionContextType, InteractionData,
            modal::{ModalInteractionComponent, ModalInteractionData},
        },
    },
    channel::message::{
        AllowedMentions,
        component::{Component, Label, TextInput, TextInputStyle},
    },
    http::interaction::{InteractionResponse, InteractionResponseType},
};
use twilight_util::builder::{InteractionResponseDataBuilder, command::CommandBuilder};

type BoxError = Box<dyn Error + Send + Sync>;

const COMMAND_NAME: &str = "request";
const MODAL_ID: &str = "request";
const DEFAULT_REPO: &str = "acornellier/not_even_close";

/// One modal field. Labels match .github/ISSUE_TEMPLATE/request.yml, so a Discord issue reads the
/// same as one filed through the form.
struct Field {
    id: &'static str,
    label: &'static str,
    placeholder: &'static str,
    style: TextInputStyle,
    max_length: u16,
    required: bool,
}

const FIELDS: [Field; 4] = [
    Field {
        id: "location",
        label: "Dungeon or class",
        placeholder: "Kings' Rest / Holy Priest",
        style: TextInputStyle::Short,
        max_length: 100,
        required: true,
    },
    Field {
        id: "ability",
        label: "Ability",
        placeholder: "Name, spell ID, or Wowhead link",
        style: TextInputStyle::Short,
        max_length: 200,
        required: true,
    },
    Field {
        id: "change",
        label: "What's wrong or missing",
        placeholder: "The site treats it as reduced by armor, but it ignores armor.",
        style: TextInputStyle::Paragraph,
        max_length: 1500,
        required: true,
    },
    Field {
        id: "evidence",
        label: "Evidence",
        placeholder: "Logs, a Wowhead tooltip, patch notes, testing",
        style: TextInputStyle::Paragraph,
        max_length: 1500,
        required: false,
    },
];

struct State {
    discord: Client,
    github: reqwest::Client,
    github_token: String,
    repo: String,
}

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), BoxError> {
    rustls::crypto::ring::default_provider()
        .install_default()
        .map_err(|_| "a rustls crypto provider was already installed")?;

    let discord_token = env::var("DISCORD_TOKEN").map_err(|_| "DISCORD_TOKEN is not set")?;
    let state = Arc::new(State {
        discord: Client::new(discord_token.clone()),
        github: reqwest::Client::new(),
        github_token: env::var("GITHUB_TOKEN").map_err(|_| "GITHUB_TOKEN is not set")?,
        repo: env::var("GITHUB_REPO").unwrap_or_else(|_| DEFAULT_REPO.to_owned()),
    });

    // Interactions arrive regardless of intents, so the bot asks for none.
    let mut shard = Shard::new(ShardId::ONE, discord_token, Intents::empty());
    let wanted = EventTypeFlags::READY | EventTypeFlags::INTERACTION_CREATE;

    // The shard reconnects on its own; it only runs out of events on a fatal close (bad token,
    // say), and exiting then lets systemd decide whether to restart.
    while let Some(item) = shard.next_event(wanted).await {
        match item {
            Ok(Event::Ready(ready)) => {
                eprintln!("connected as {}", ready.user.name);
                let command = CommandBuilder::new(
                    COMMAND_NAME,
                    "Report a wrong or missing ability",
                    CommandType::ChatInput,
                )
                .contexts([InteractionContextType::Guild])
                .build();
                // Overwrites the whole set, so re-registering on every connect is harmless.
                if let Err(error) = state
                    .discord
                    .interaction(ready.application.id)
                    .set_global_commands(&[command])
                    .await
                {
                    eprintln!("registering /{COMMAND_NAME} failed: {error}");
                }
            }
            Ok(Event::InteractionCreate(event)) => {
                let state = Arc::clone(&state);
                tokio::spawn(async move {
                    if let Err(error) = handle_interaction(&state, event.0).await {
                        eprintln!("interaction failed: {error}");
                    }
                });
            }
            Ok(_) => {}
            Err(error) => eprintln!("gateway error: {error}"),
        }
    }

    Err("gateway connection closed".into())
}

async fn handle_interaction(state: &State, interaction: Interaction) -> Result<(), BoxError> {
    match &interaction.data {
        Some(InteractionData::ApplicationCommand(command)) if command.name == COMMAND_NAME => {
            show_modal(state, &interaction).await
        }
        Some(InteractionData::ModalSubmit(modal)) if modal.custom_id == MODAL_ID => {
            file_request(state, &interaction, modal).await
        }
        _ => Ok(()),
    }
}

async fn show_modal(state: &State, interaction: &Interaction) -> Result<(), BoxError> {
    state
        .discord
        .interaction(interaction.application_id)
        .create_response(interaction.id, &interaction.token, &request_modal())
        .await?;
    Ok(())
}

fn request_modal() -> InteractionResponse {
    #[allow(deprecated)] // TextInput::label; the Label component carries it instead.
    let components = FIELDS.iter().map(|field| {
        Component::Label(Label {
            id: None,
            label: field.label.to_owned(),
            description: None,
            component: Box::new(Component::TextInput(TextInput {
                id: None,
                custom_id: field.id.to_owned(),
                label: None,
                max_length: Some(field.max_length),
                min_length: None,
                placeholder: Some(field.placeholder.to_owned()),
                required: Some(field.required),
                style: field.style,
                value: None,
            })),
        })
    });

    InteractionResponse {
        kind: InteractionResponseType::Modal,
        data: Some(
            InteractionResponseDataBuilder::new()
                .custom_id(MODAL_ID)
                .title("Data correction")
                .components(components)
                .build(),
        ),
    }
}

async fn file_request(
    state: &State,
    interaction: &Interaction,
    modal: &ModalInteractionData,
) -> Result<(), BoxError> {
    let discord = state.discord.interaction(interaction.application_id);

    // Discord allows 3 seconds for the first response; GitHub can take longer than that.
    let deferred = InteractionResponse {
        kind: InteractionResponseType::DeferredChannelMessageWithSource,
        data: None,
    };
    discord
        .create_response(interaction.id, &interaction.token, &deferred)
        .await?;

    let reply = match create_issue(state, interaction, modal).await {
        Ok(url) => format!(
            "Filed as {url}. A bot will check whether it's a small data fix and, if so, open a pull request for review."
        ),
        Err(error) => {
            eprintln!("filing issue failed: {error}");
            "Couldn't file this request on GitHub. Try again later, or post it in the channel."
                .to_owned()
        }
    };

    // The reply has no user text in it, but never let it ping anyone regardless.
    let no_pings = AllowedMentions::default();
    discord
        .update_response(&interaction.token)
        .allowed_mentions(Some(&no_pings))
        .content(Some(&reply))
        .await?;
    Ok(())
}

async fn create_issue(
    state: &State,
    interaction: &Interaction,
    modal: &ModalInteractionData,
) -> Result<String, BoxError> {
    let value = |id: &str| field_value(&modal.components, id).map(neutralize_mentions);

    let location = value("location").unwrap_or_default();
    let ability = value("ability").unwrap_or_default();
    let title: String = format!("[Request] {ability} ({location})")
        .chars()
        .take(120)
        .collect();

    let mut body = String::new();
    for field in &FIELDS {
        let answer = value(field.id).filter(|answer| !answer.trim().is_empty());
        body.push_str(&format!(
            "### {}\n\n{}\n\n",
            field.label,
            answer.as_deref().unwrap_or("_No response_")
        ));
    }
    if let Some(user) = interaction.author() {
        let display_name = user.global_name.as_deref().unwrap_or(&user.name);
        body.push_str(&format!(
            "---\nRequested on Discord by {} ({}, ID {}).\n",
            neutralize_mentions(display_name),
            neutralize_mentions(&user.name),
            user.id
        ));
    }

    let response = state
        .github
        .post(format!(
            "https://api.github.com/repos/{}/issues",
            state.repo
        ))
        .bearer_auth(&state.github_token)
        .header(reqwest::header::USER_AGENT, "nec-discord-bot")
        .header(reqwest::header::ACCEPT, "application/vnd.github+json")
        .header("X-GitHub-Api-Version", "2022-11-28")
        .json(&json!({ "title": title, "body": body, "labels": ["bot-request"] }))
        .send()
        .await?;

    let status = response.status();
    let created: serde_json::Value = response.json().await?;
    if !status.is_success() {
        return Err(format!("GitHub returned {status}: {created}").into());
    }
    created["html_url"]
        .as_str()
        .map(str::to_owned)
        .ok_or_else(|| "GitHub's response had no html_url".into())
}

/// The submitted value of a modal text input, looking inside the Label wrapping it.
fn field_value<'a>(components: &'a [ModalInteractionComponent], id: &str) -> Option<&'a str> {
    components.iter().find_map(|component| match component {
        ModalInteractionComponent::Label(label) => {
            field_value(std::slice::from_ref(label.component.as_ref()), id)
        }
        ModalInteractionComponent::TextInput(input) if input.custom_id == id => {
            Some(input.value.as_str())
        }
        _ => None,
    })
}

/// Issues are filed with the repo owner's token, so an `@name` in the text would notify that
/// GitHub user from the owner's account. A zero-width space after `@` stops the mention.
fn neutralize_mentions(text: &str) -> String {
    text.replace('@', "@\u{200B}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_text_inputs_inside_labels() {
        // Shape of a modal submit as Discord sends it: each text input wrapped in a Label (18).
        let data: ModalInteractionData = serde_json::from_value(json!({
            "custom_id": "request",
            "components": [
                { "type": 18, "id": 1, "component":
                    { "type": 4, "id": 2, "custom_id": "location", "value": "Kings' Rest" } },
                { "type": 18, "id": 3, "component":
                    { "type": 4, "id": 4, "custom_id": "evidence", "value": "" } },
            ],
        }))
        .unwrap();

        assert_eq!(
            field_value(&data.components, "location"),
            Some("Kings' Rest")
        );
        assert_eq!(field_value(&data.components, "evidence"), Some(""));
        assert_eq!(field_value(&data.components, "ability"), None);
    }

    #[test]
    fn modal_wraps_each_input_in_a_label() {
        let modal = serde_json::to_value(request_modal()).unwrap();
        assert_eq!(modal["type"], 9);
        let first = &modal["data"]["components"][0];
        assert_eq!(first["type"], 18);
        assert_eq!(first["label"], "Dungeon or class");
        assert_eq!(first["component"]["type"], 4);
        assert_eq!(first["component"]["custom_id"], "location");
        assert!(first["component"].get("label").is_none());
    }

    #[test]
    fn breaks_github_mentions() {
        assert_eq!(neutralize_mentions("ask @octocat"), "ask @\u{200B}octocat");
    }
}
