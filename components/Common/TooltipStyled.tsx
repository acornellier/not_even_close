import { ITooltip, Tooltip, TooltipRefProps } from 'react-tooltip'
import { forwardRef, ReactNode } from 'react'
import { isClient } from '../Tools/isClient'
import { useIsMobile } from '../Tools/useIsMobile'

interface Props extends ITooltip {}

export const TooltipStyled = forwardRef<TooltipRefProps, Props>(function TooltipStyled(
  { className, ...props },
  ref
) {
  const isMobile = useIsMobile()

  return (
    <Tooltip
      ref={ref}
      className={`z-10 max-w-sm ${className}`}
      border="1px solid #9ca3af"
      opacity={1}
      place="top-start"
      {...(isMobile ? { isOpen: false } : {})}
      {...props}
    />
  )
})
