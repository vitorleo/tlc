import { useId } from 'react'
import styles from './ButtonRound.module.css'

type NumberProps = {
    label: string;
    isPrimary?: boolean;
    icon: string;
    className?: string;
    style?: object;
    onCLick: () => void;
}

function ButtonRound(props:NumberProps) {
  const { label, isPrimary = false, className="", style={}, icon, onCLick } = props;
  const id = useId()

  return (
    <button type='button' onClick={onCLick} className={`${styles["button-round"]} ${isPrimary?"primary":""} ${className}`} style={style} aria-labelledby={id}>
        {icon && 
        <img src={icon} className="icon" alt="button icon" />
        }
        <span id={id} hidden>{label}</span>
    </button>
  )
}

export default ButtonRound