import { useState } from 'react'
import './App.css'

import TicketGrid from './components/TicketGrid/TicketGrid'
import ButtonRound from './components/ButtonRound/ButtonRound'
import IconFetch from './assets/icon_bolt.svg'
import IconTrash from './assets/icon_trash.svg'
import DrawnNumber from './components/DrawnNumber/DrawnNumber'

function App() {
  const [primaryNumbers, setPrimaryNumbers] = useState(new Array(7).fill(null));
  const [secondaryNumbers, setSecondaryNumbers] = useState(new Array(1).fill(null));

  function fetchResults():void {
    fetch("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
      {
        method:"POST",
        body: JSON.stringify({ "CompanyId": "GoldenCasket", "MaxDrawCountPerProduct": 1, "OptionalProductFilter": ["Powerball"] })
      }).then(async (res)=>{
        const responseObj = await res.json();
        setSecondaryNumbers(responseObj.DrawResults[0].SecondaryNumbers);
        setPrimaryNumbers(responseObj.DrawResults[0].PrimaryNumbers);
      }).catch(err=>{
        // Treat error and inform user
        console.log(err);
      })
  }

  function resetData () {
    setPrimaryNumbers(new Array(7).fill(null));
    setSecondaryNumbers(new Array(1).fill(null));
  }

  return (
    <>
      <h1>Powerball results</h1>
      <div className='top-bar'>
        <div className='drawn-numbers'>
            { primaryNumbers.map((n,i) => {
                return <DrawnNumber isDrawn={n ? true : false} key={"pn"+i}>{n}</DrawnNumber>
              })
            }

            { secondaryNumbers.map((n,i) => {
                return (<DrawnNumber isDrawn={n ? true : false} isSecondary={true} key={"sn"+i}>
                  {n ? n : "PB"}
                </DrawnNumber>)
              })
            }
        </div>
        <div className='buttons'>
          <ButtonRound icon={IconFetch} onClick={fetchResults} label="Fetch results" isPrimary={true}></ButtonRound>
          <ButtonRound icon={IconTrash} onClick={resetData} label="Clear results"></ButtonRound>
        </div>
      </div>

      <TicketGrid
        totalNumbers={35}
        drawnNumbers={primaryNumbers}
      />
      <div className='section-header'>
            Select your Powerball
      </div>
      <TicketGrid
        totalNumbers={20}
        drawnNumbers={secondaryNumbers}
      />
    </>
  )
}

export default App
