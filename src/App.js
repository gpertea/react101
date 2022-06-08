import './App.css'
import './styles.css'
import { useState, useEffect } from 'react'

const tabs  = ["RNAseq", "DNAmet", "WGS"] // tab display labels
const tabIds= ["rnaseq", "dnam",   "wgs"] // corresponding data type IDs in database

const mwSrv="http://srv16.lieber.local:4095/pgdb/dslist"; //  + /tabIds[tab]

function TClock() { //self updating clock component
  const [time, setTime] = useState(new Date().toLocaleString())   
  //mount/unmount hook
  useEffect( ()=>{
    const interval = setInterval( ()=> setTime(new Date().toLocaleString()), 1000)
    return ()=> { clearInterval(interval)}
  }, [] )
  return (
   <div style={{color: "#666", position:"relative", width:"100%", textAlign:"right", top: "4px", height:"0px"}}>
     {time}&nbsp; 
   </div>
  )
}

function App() {
  const [tab, setTab] = useState(0) //numeric ID of the selected tab
  const [datasets, setDatasets]=useState([]) //data fetched asynchronously

  // mount/dismount hook
  useEffect(() => {
    console.log(" >> App mounted in DOM");
    return ()=> {
       console.log(" << App dismounted.")
    }
  }, []) // <-- empty dependency array means mount/dismount hook

  // useEffect post-render hook
  useEffect(() => {
    console.log(`  -- useEffect: post-render after tab changed to ${tabs[tab]}`)
    fetch(`${mwSrv}/${tabIds[tab]}`)
     .then(res => res.json())
     .then(json => { //async code
         console.log("### received and decoded: ", json)
         setDatasets(json)
        })
  }, [tab]) //<-- dependency array


  const dataReady=(datasets && datasets.length)
  const dr=dataReady ? "" : "NOT "
  console.log(`~~~~ App rendering with tab: ${tabs[tab]}, data ${dr}ready`)
  return (
    <div className="App">
      <div className="content">
        <TClock />
        <h3>Datasets</h3>
        <div className="tabs">
          { tabIds.map( (dbId, idx) =>
            <span key={dbId} className={tab===idx ? "tab-hdr sel" : "tab-hdr"} >
              <button onClick={()=> { setTab(idx); setDatasets([])} }>{tabs[idx]}</button>
            </span>
            )}
         <div className="tab-content">
          { dataReady ?
           <div> <table className="tbl">
             <thead>
               <tr>{ datasets[0].map((h)=><th key={h}>{h}</th>) }</tr>
             </thead>
             <tbody>
             { datasets.slice(1).map( (r,i) =>
               <tr key={i}>{ r.map( (c,j) =>
                  <td key={j}>{c}</td>) }
               </tr>)
             }
             </tbody>
            </table>
          </div>
          : <h3> Loading... </h3>
          }
         </div>
       </div>
       <br/>
      </div>
    </div>
  )
}

export default App;
