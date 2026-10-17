# Discord request bot

`/request` in Discord opens a form and files the answers as a `bot-request` GitHub issue. The
[request bot workflow](../.github/workflows/request-bot.yml) then handles it the same as an issue
opened through the [GitHub form](../.github/ISSUE_TEMPLATE/request.yml).

## Setup

1. In the [Discord developer portal](https://discord.com/developers/applications), create an
   application, then copy the token from its Bot page. No privileged intents are needed.
2. Invite it with
   `https://discord.com/oauth2/authorize?client_id=<application id>&scope=bot+applications.commands&permissions=0`.
3. Create a fine-grained GitHub token limited to this repository with **Issues: Read and write**.
   Issues are filed as the token's owner.
4. Write the environment file:

   ```sh
   mkdir -p ~/.config/nec-discord-bot
   install -m 600 /dev/null ~/.config/nec-discord-bot/env
   printf 'DISCORD_TOKEN=...\nGITHUB_TOKEN=...\n' > ~/.config/nec-discord-bot/env
   ```

   `GITHUB_REPO` defaults to `acornellier/not_even_close`.

5. Build, install and start it:

   ```sh
   cargo build --release && install -m 755 target/release/nec-discord-bot ~/.local/bin/
   cp nec-discord-bot.service ~/.config/systemd/user/
   systemctl --user daemon-reload && systemctl --user enable --now nec-discord-bot
   journalctl --user -u nec-discord-bot -f
   ```

The command is registered globally on every connect.
