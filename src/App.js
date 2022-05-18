import './App.css'
import './styles.css'
import {useState, useRef, useEffect} from 'react'

const LOCAL_STORAGE_KEY="shopping_list"
const storedItems=[]
const storedData=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
if (storedData) storedItems.push(...storedData)

function List(props) {
  const c=props.color || "darkred"
  return (
    <ul className="ulist" style={ {color: c }}>
    { props.items.map( (item,i) => <li key={i}> {item}</li> ) }
    </ul>
 )}

 function App() {
  let date=new Date().toLocaleString()
  const [items, setItems]=useState(storedItems)
  const inputRef=useRef()

  useEffect( ()=>{
     //if (items.length) {
       console.log(" ..... storing to local storage: ", items)
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
     //}
  })

 //console.log("........... rendering  with items =", items)
 function addItem(e) {
    const inputbox=inputRef.current //that's how we access the current reference variable (sic!)
    const newitem=inputbox.value
    if (newitem.trim().length===0) return
    console.log("Button clicked, adding ", newitem)
    setItems([...items, newitem]) // !! request a STATE UPDATE here!!
    inputbox.value="" //clear the input box to make it ready for next input
  }

  function clearList() { setItems([]) }

  return (
    <div className="App">
      <div className="content">
        <h3>Date is: {date}</h3>
        <List items={items}/>
      </div>
      <div className="input-area">
           <label>Enter item: <input ref={inputRef} type="text" id="txtIn"/> </label>
           <button type="button"  onClick={addItem}>Add item</button>
      </div>
      <div>
        <button type="button" onClick={clearList}>Clear list!</button>
      </div>
    </div>
 )}

export default App;
