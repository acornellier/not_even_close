interface OnOffButtonProps {
  label: string
  enabled: boolean
  isLeft?: boolean
}

function OnOffButton({ label, enabled, isLeft }: OnOffButtonProps) {
  const opacityClass = enabled ? '' : 'opacity-30'
  const roundedClass = isLeft ? 'rounded-l' : 'rounded-r'

  return (
    <button
      className={`text-white bg-teal-600 font-medium text-sm py-2 px-4 ${opacityClass} ${roundedClass}`}
    >
      {label}
    </button>
  )
}

interface Props {
  label?: string
  label1: string
  label2: string
  enabled: boolean
  setIsEnabled: (value: boolean) => void
}

export function OnOffStateSelector({
  label,
  label1,
  label2,
  enabled,
  setIsEnabled,
}: Props) {
  return (
    <div>
      {label && <label className="block font-bold mb-1 pr-4">{label}</label>}
      <div className="inline-flex" onClick={() => setIsEnabled(!enabled)}>
        <OnOffButton label={label1} enabled={!enabled} isLeft />
        <OnOffButton label={label2} enabled={enabled} />
      </div>
    </div>
  )
}
