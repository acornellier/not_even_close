import { CustomInput } from './CustomInput'

interface Props {
  setCustomAbsorbs: (value: ((prevState: string) => string) | string) => void
  customAbsorbs: string
}

export function CustomAbsorbs({ customAbsorbs, setCustomAbsorbs }: Props) {
  return (
    <CustomInput
      label="Custom absorbs"
      placeholder="Comma separated absorbs"
      value={customAbsorbs}
      setValue={setCustomAbsorbs}
      tooltip={
        <>
          <p>Any missing absorbs can be added here.</p>
          <p>For example, you can write &quot;50273, 207132&quot;.</p>
        </>
      }
    />
  )
}
