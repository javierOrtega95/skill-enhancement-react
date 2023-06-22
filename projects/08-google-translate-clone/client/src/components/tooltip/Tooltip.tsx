import './tooltip.css'
interface Props {
  text: string
  children: React.ReactNode
  position?: string
}

export const Tooltip = ({ text, children, position = 'bottom' }: Props) => {
  return (
    <div className='tooltip'>
      {children}
      <div className={`tooltiptext tooltip-${position}`}>
        {text}
      </div>
    </div>
  )
}
