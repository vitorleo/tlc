import { useMemo } from 'react'
import TicketNumber from '../TicketNumber/TicketNumber'
import styles from './TicketGrid.module.css'

type TicketProps = {
  totalNumbers: number;
  drawnNumbers?: number[];
}

function TicketGrid(props:TicketProps) {
  const { totalNumbers, drawnNumbers=[] } = props;

  // Memoize an array for the secondary numbers to make the TOP part of the ticket
  const primaryGrid = useMemo(()=>{
    const ar = new Array(totalNumbers);
    for(let i=1;i<=totalNumbers; i++) {
        ar[i] = i;
    }
    return ar;
  }, [totalNumbers]);

  return (
    <div className={styles["ticket-grid"]} data-testid="ticket-grid">
      {
          primaryGrid.map( (n) => {
              const isDrawn = drawnNumbers.includes(n)    
              return <TicketNumber label={n.toString()} drawn={isDrawn} key={`p_${n}`} />
          })
      }
    </div>
  )
}

export default TicketGrid;