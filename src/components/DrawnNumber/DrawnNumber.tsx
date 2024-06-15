import { PropsWithChildren } from 'react'
import './DrawnNumber.css'

type DrawnNumberProps = {
  isDrawn?: boolean
  isSecondary?: boolean
}

function DrawnNumber(props: PropsWithChildren<DrawnNumberProps>) {
  const { isDrawn=false, isSecondary=false, children } = props;

  const drawnClass = isDrawn ? "drawn" : ""
  const secondaryClass = isSecondary ? "secondary" : ""
  return (
      <div className={`drawn-number ${drawnClass} ${secondaryClass}`}>
        {children}
      </div>
  )
}

export default DrawnNumber