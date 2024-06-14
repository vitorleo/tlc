import './TicketNumber.css'

type NumberProps = {
    label: string
    drawn: boolean
}

function TicketNumber(props:NumberProps) {
  const { label, drawn } = props;

  return (
      <div className={`ticket-number ${drawn ? "drawn" : ""}`}>
        <span className='label'>{label}</span>
      </div>
  )
}

export default TicketNumber