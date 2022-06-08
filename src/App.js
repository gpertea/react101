import './App.css'
import './styles.css'
import { useState, useEffect } from 'react'

const tabs  = ["RNAseq", "DNAmet", "WGS"] // tab display labels
const tabIds= ["rnaseq", "dnam",   "wgs"] // corresponding data type IDs in database


function TClock() { //self updating clock component
   const [time, setTime] = useState(new Date().toLocaleString())   
   //mount/unmount hook
   useEffect( ()=>{
     const interval = setInterval( ()=> setTime(new Date().toLocaleString()), 1000)
     return ()=> { clearInterval(interval)}
   }, [] )
   return (
    <div style={{color: "#666", position:"relative", width:"100%", textAlign:"right", top: "4px", height:"0px"}}>{time}&nbsp;</div>
   )
}

function App() {
  //let date = new Date().toLocaleString()
  const [tab, setTab] = useState(0) //numeric ID of the selected tab

  // mount/unmount hook
  useEffect(() => {
    console.log(" >> App mounted in DOM");
    return ()=> {
       console.log(" << App unmounting.")
    }
  }, []) // <-- empty dependency array means mount/unmount hook

  // useEffect post-render hook
  useEffect(() => {
    console.log(`  -- useEffect: post-render after tab changed to ${tabs[tab]}`)
  }, [tab]) //<-- dependency array

  console.log(`~~~~ App rendering with tab: ${tabs[tab]}`)

  return (
    <div className="App">
      <div className="content">
        <TClock />
        <h3>Datasets</h3>
        <div className="tabs">
          { tabIds.map( (dbId, idx) =>
            <span key={dbId} className={tab===idx ? "tab-hdr sel" : "tab-hdr"} >
              <button onClick={()=>setTab(idx)}>{tabs[idx]}</button>
            </span>
            )}
         <div className="tab-content">
           <div style={{padding: "1em 0"}}>Data type: {tabs[tab]} </div>
         </div>
       </div>
        <br/>
      </div>
    </div>
  )
}

export default App;
