import { CustomInput } from './CustomInput'

interface Props {
  setCustomDrs: (value: ((prevState: string) => string) | string) => void
  customDrs: string
}

export function CustomDrs({ customDrs, setCustomDrs }: Props) {
  return (
    <CustomInput
      label="Custom DRs"
      placeholder="Comma separated DRs (%)"
      value={customDrs}
      setValue={setCustomDrs}
      tooltip={
        <>
          <p>Any missing DRs can be added here, such as racials.</p>
          <p>
            If you have 1% DR from racial, and 20% DR from the dark zone in Manifested
            Timeways, write &quot;1, 20&quot;.
          </p>
        </>
      }
    />
  )
}
