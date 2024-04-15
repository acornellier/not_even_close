import type { ITooltip, TooltipRefProps } from 'react-tooltip';
import { Tooltip } from 'react-tooltip'
import { forwardRef } from 'react'
import { useIsMobile } from '../../util/useIsMobile'

interface Props extends ITooltip {}

export const TooltipStyled = forwardRef<TooltipRefProps, Props>(function TooltipStyled(
  { className, ...props },
  ref,
) {
  const isMobile = useIsMobile()

  return (
    <Tooltip
      ref={ref}
      className={`z-10 max-w-sm whitespace-normal ${className}`}
      border="1px solid #9ca3af"
      opacity={1}
      place="top-start"
      {...(isMobile ? { isOpen: false } : {})}
      {...props}
    />
  )
})
