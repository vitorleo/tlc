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
  const [loadingData, setLoadingData] = useState(false)



  function fetchResults():void {
    setLoadingData(true);
    fetch("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
      {
        method:"POST",
        body: JSON.stringify({ "CompanyId": "GoldenCasket", "MaxDrawCountPerProduct": 1, "OptionalProductFilter": ["Powerball"] })
      }).then(async (res)=>{
        const responseObj = await res.json();
        setSecondaryNumbers(responseObj.DrawResults[0].SecondaryNumbers);
        setPrimaryNumbers(responseObj.DrawResults[0].PrimaryNumbers);
        setLoadingData(false);
      }).catch(err=>{
        // Treat error and inform user
        console.log(err);
        setLoadingData(false);
      })
  }

  function resetData () {
    setPrimaryNumbers(new Array(7).fill(null));
    setSecondaryNumbers(new Array(1).fill(null));
  }

  return (
    <>
      <h1>Powerball results</h1>
      <div className='ticket'>
        <div className='drawnNumbers'>
          { primaryNumbers.map(n => {
              return <DrawnNumber isDrawn={n ? true : false}>{n}</DrawnNumber>
            })
          }

          { secondaryNumbers.map(n => {
              return (<DrawnNumber isDrawn={n ? true : false} isSecondary={true}>
                {n ? n : "PB"}
              </DrawnNumber>)
            })
          }

        </div>
        <div>

        <ButtonRound icon={IconFetch} onCLick={fetchResults} label="Fetch results" isPrimary={true}></ButtonRound>
        <ButtonRound icon={IconTrash} onCLick={resetData} label="Clear results"></ButtonRound>
        {loadingData && <span>Fetching result</span> }
        </div>
      </div>

      <TicketGrid
        totalNumbers={35}
        drawnNumbers={primaryNumbers}
      />
      <div className='sectionHeader'>
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
