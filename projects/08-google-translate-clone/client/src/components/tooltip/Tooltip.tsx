import './tooltip.css'
interface Props {
  text: string
  children: React.ReactNode
  position?: string
}

export const Tooltip = ({ text, children, position = 'top' }: Props) => {
  return (
    <div className='tooltip'>
      {children}
      <div className={`tooltiptext tooltip-${position}`}>
        {text}
        <span className='arrow' />
      </div>
    </div>
  )
}
