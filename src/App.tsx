import { useEffect, useState } from 'react'
import './App.css'
import Ticket from './components/Ticket/Ticket'

function App() {

  const [primaryNumbers, setPrimaryNumbers] = useState([2,4,6]);
  const [secondaryNumbers, setSecondaryNumbers] = useState([11,13,15]);

  function fetchResults () {
    fetch("https://data.api.thelott.com/sales/vmax/web/data/lotto/latestresults",
      {
        method:"POST",
        body: JSON.stringify({ "CompanyId": "GoldenCasket", "MaxDrawCountPerProduct": 1, "OptionalProductFilter": ["Powerball"] })
      }).then(async (res)=>{
        const responseObj = await res.json();
        setSecondaryNumbers([1,2,3])
        console.log(responseObj)
      })
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
        />
    </>
  )
}

export default App
