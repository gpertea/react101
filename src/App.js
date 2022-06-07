import './App.css'
import './styles.css'
import { useState, useEffect } from 'react'

const tabs=["RNAseq", "DNAmet", "WGS"]

function App() {
  let date = new Date().toLocaleString()
  const [activeTab, setActiveTab] = useState(tabs[0])

  //mount/dismount hook
  useEffect(() => {
    console.log(" >> App mounted in DOM");
    return ()=> {
       console.log(" << App dismounted.")
    }
  }, []) // <-- empty dependency array means mount/dismount hook

  //use
  useEffect(() => {
    console.log(` --- useEffect: post-render as data type changed to ${activeTab}`)
  }, [activeTab]) //<-- dependency array

  console.log(`~~~~ App rendering with data type: ${activeTab}`)

  return (
    <div className="App">
      <div className="content">
        <h4>{date}</h4>
        <h3>Datasets</h3>
        <div className="tabs">
          { tabs.map( (item, idx) =>
            <span className={activeTab===item ? "tab-hdr sel" : "tab-hdr"} >
            <button onClick={()=>setActiveTab(item)}>{item}</button>
            </span>
            )}
         <div className="tab-content">
           <div style={{padding: "1em 0"}}>Data type: {activeTab} </div>
         </div>
       </div>
        <br/>
      </div>
    </div>
  )
}

export default App;
