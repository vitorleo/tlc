import { useMemo, useState } from 'react'
import Number from '../TicketNumber/TicketNumber'
import './Ticket.css'

type TicketProps = {
    totalPrimaryNumbers: number;
    totalSecondaryNumbers: number;
    primaryNumbers?: number[];
    secondaryNumbers?: number[];
    onFetchResults: () => Promise<void>;
    onResetData: () => void;
}

function TicketNumber(props:TicketProps) {
  const { totalPrimaryNumbers, totalSecondaryNumbers, primaryNumbers = [], secondaryNumbers = [], onFetchResults, onResetData } = props;
  const [loadingData, setLoadingData] = useState(false)

  // Memoize an array for the secondary numbers to make the TOP part of the ticket
  const primaryGrid = useMemo(()=>{
    return numbersArray(totalPrimaryNumbers)
  }, [totalPrimaryNumbers]);

  // Memoize an array for the secondary numbers to make the BOTTOM part of the ticket
  const secondaryGrid = useMemo(()=>{
    return numbersArray(totalSecondaryNumbers)
  }, [totalSecondaryNumbers]);

  // Create an array of sequencial numbers given the total of elements
  function numbersArray(total:number): number[] {
    const ar = new Array(total);
    for(let i=1;i<=total; i++) {
        ar[i] = i;
    }
    return ar;
  }

  async function loadData() {
    setLoadingData(true);
    await onFetchResults();
    setLoadingData(false);
  }

  return (
    <div className='ticket'>
        <div className='drawnNumbers'>

        </div>
        <div>
          <button type='button' onClick={loadData}>Fetch</button> { }
          <button type='button' onClick={onResetData}>Clean</button> { }
          {loadingData && <span>Fetching result</span> }
        </div>
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