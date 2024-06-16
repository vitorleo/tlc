import styles from './TicketNumber.module.css'

type NumberProps = {
    label: string
    drawn: boolean
}

function TicketNumber(props:NumberProps) {
  const { label, drawn } = props;

  return (
      <div className={`${styles["ticket-number"]} ${drawn ? styles.drawn : ""}`} data-testid={drawn ? "ticket-number-drawn" : "ticket-number"}>
        <span className={styles.label}>{label}</span>
      </div>
  )
}

export default TicketNumber