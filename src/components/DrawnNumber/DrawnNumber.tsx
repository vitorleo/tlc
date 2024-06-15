import { PropsWithChildren } from 'react'
import styles from './DrawnNumber.module.css'

type DrawnNumberProps = {
  isDrawn?: boolean
  isSecondary?: boolean
}

function DrawnNumber(props: PropsWithChildren<DrawnNumberProps>) {
  const { isDrawn=false, isSecondary=false, children } = props;

  const drawnClass = isDrawn ? styles.drawn : ""
  const secondaryClass = isSecondary ? styles.secondary : ""
  return (
      <div className={`${styles["drawn-number"]} ${drawnClass} ${secondaryClass}`}>
        {children}
      </div>
  )
}

export default DrawnNumber