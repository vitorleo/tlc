import './TicketNumber.css'

type NumberProps = {
    label: string
    drawn: boolean
}

function Number(props:NumberProps) {
  const { label, drawn } = props;

  return (
      <div className={drawn ? "drawn" : ""}>{label}</div>
  )
}

export default Number