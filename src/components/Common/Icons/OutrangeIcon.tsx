import { forwardRef, Ref, SVGProps } from 'react'

const OutrangeIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="#000"
    strokeWidth={2.4}
    viewBox="0 0 48 48"
    ref={ref}
    {...props}
  >
    <g id="SVGRepo_iconCarrier">
      <defs>
        <style>
          {'.a{fill:none;stroke:white;stroke-linecap:round;stroke-linejoin:round}'}
        </style>
      </defs>
      <circle cx={24} cy={24} r={21.5} className="a" />
      <circle cx={24} cy={24} r={14.3} className="a" />
      <circle cx={24} cy={24} r={7.41} className="a" />
    </g>
  </svg>
)
const ForwardRef = forwardRef(OutrangeIcon)
export { ForwardRef as OutrangeIcon }
