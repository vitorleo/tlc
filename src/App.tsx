import { useState } from 'react'
import './App.css'

import TicketGrid from './components/TicketGrid/TicketGrid'
import ButtonRound from './components/ButtonRound/ButtonRound'
import IconFetch from './assets/icon_bolt.svg'
import IconTrash from './assets/icon_trash.svg'
import DrawnNumber from './components/DrawnNumber/DrawnNumber'

// Some constants to emulate values coming from environment variables
const APP_TITLE = "Powerball results";
const MID_SECTION_TITLE = "Select your Powerball";
const TOTAL_PRIMARY = 35;
const TOTAL_SECONDARY = 20;
const LABEL_FETCH = "Fetch latest result";
const LABEL_CLEAR = "Clear results";
const API_URL = "https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults";
const API_PAYLOAD = { "CompanyId": "GoldenCasket", "MaxDrawCountPerProduct": 1, "OptionalProductFilter": ["Powerball"] }

function App() {

  // Set up state variables to manage priary and secondary drawn numbers.
  const [primaryNumbers, setPrimaryNumbers] = useState(new Array(7).fill(null));
  const [secondaryNumbers, setSecondaryNumbers] = useState(new Array(1).fill(null));


  // Fetches results form API.
  function fetchResults():void {
    fetch(API_URL,
      {
        method:"POST",
        body: JSON.stringify(API_PAYLOAD)
      }).then(async (res)=>{
        const responseObj = await res.json();
        setSecondaryNumbers(responseObj.DrawResults[0].SecondaryNumbers);
        setPrimaryNumbers(responseObj.DrawResults[0].PrimaryNumbers);
      }).catch(err=>{
        // TODO: Treat error and inform user
        console.log(err);
      })
  }

  // Cleans up the data sent to ticket components
  function resetData () {
    setPrimaryNumbers(new Array(7).fill(null));
    setSecondaryNumbers(new Array(1).fill(null));
  }

  return (
    <>
      <h1>{APP_TITLE}</h1>
      <div className='top-bar'>
        <div className='drawn-numbers'>
            {/* Loops through the drawn primary numbers */}
            { primaryNumbers.map((n,i) => {
                return <DrawnNumber isDrawn={n ? true : false} key={"pn"+i}>{n}</DrawnNumber>
              })
            }

            {/* Loops through the drawn secondary numbers */}
            { secondaryNumbers.map((n,i) => {
                return (<DrawnNumber isDrawn={n ? true : false} isSecondary={true} key={"sn"+i}>
                  {n ? n : "PB"}
                </DrawnNumber>)
              })
            }
        </div>
        <div className='buttons'>
          {/* Action buttons: Fetch and clean data */}
          <ButtonRound icon={IconFetch} onClick={fetchResults} label={LABEL_FETCH} isPrimary={true}></ButtonRound>
          <ButtonRound icon={IconTrash} onClick={resetData} label={LABEL_CLEAR}></ButtonRound>
        </div>
      </div>

      {/* Renders the top section of the ticket. */}
      <TicketGrid
        totalNumbers={TOTAL_PRIMARY}
        drawnNumbers={primaryNumbers}
      />
      <div className='section-header'>
            {MID_SECTION_TITLE}
      </div>

      {/* Renders the bottom section of the ticket. */}
      <TicketGrid
        totalNumbers={TOTAL_SECONDARY}
        drawnNumbers={secondaryNumbers}
      />
    </>
  )
}

export default App
