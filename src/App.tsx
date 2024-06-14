import { useState } from 'react'
import './App.css'
import Ticket from './components/Ticket/Ticket'

function App() {

  const [primaryNumbers, setPrimaryNumbers] = useState([]);
  const [secondaryNumbers, setSecondaryNumbers] = useState([]);


  async function fetchResults():Promise<void> {
    return fetch("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
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
    setPrimaryNumbers([]);
    setSecondaryNumbers([]);
  }

  return (
    <>
      <h1>Powerball results</h1>
      <Ticket
        totalPrimaryNumbers={35}
        totalSecondaryNumbers={20}
        primaryNumbers={primaryNumbers}
        secondaryNumbers={secondaryNumbers}
        onFetchResults={fetchResults}
        onResetData={resetData}
        />
    </>
  )
}

export default App
