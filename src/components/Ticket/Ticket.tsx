import { useMemo } from 'react'
import Number from '../TicketNumber/TicketNumber'
import './Ticket.css'

type TicketProps = {
    totalPrimaryNumbers: number;
    totalSecondaryNumbers: number;
    primaryNumbers?: number[];
    secondaryNumbers?: number[];
    onFetchResults?: () => {};
}

function TicketNumber(props:TicketProps) {
  const { totalPrimaryNumbers, totalSecondaryNumbers, primaryNumbers = [], secondaryNumbers = [], onFetchResults } = props;

  // Memoize an array for the secondary numbers to make the TOP part of the ticket
  const primaryGrid = useMemo(()=>{
    return numbersArray(totalPrimaryNumbers)
  }, [totalPrimaryNumbers]);

  // Memoize an array for the secondary numbers to make the BOTTOM part of the ticket
  const secondaryGrid = useMemo(()=>{
    return numbersArray(totalPrimaryNumbers)
  }, [totalPrimaryNumbers]);

  // Create an array of sequencial numbers given the total of elements
  function numbersArray(total:number): number[] {
    const ar = new Array(total);
    for(let i=1;i<=total; i++) {
        ar[i] = i;
    }
    return ar;
  }

  return (
    <div className='ticket'>
        <div className='drawnNumbers'>

        </div>
        <button type='button' onClick={onFetchResults}>Fetch</button>
        <div className='numbers_grid numbers_grid__primary'>
            {
                primaryGrid.map( (n) => {
                    const isDrawn = primaryNumbers.includes(n)    
                    return <Number label={n.toString()} drawn={isDrawn} key={`p_${n}`} />
                })
            }
        </div>
        <div className='sectionHeader'>
            Select your Powerball
        </div>
        <div className='numbers_grid numbers_grid__secondary'>
            {
                secondaryGrid.map( (n) => {
                    const isDrawn = secondaryNumbers.includes(n)    
                    return <Number label={n.toString()} drawn={isDrawn} key={`s_${n}`} />
                })
            }
        </div>
    </div>
  )
}

export default TicketNumber;