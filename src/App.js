import './App.css'
import './styles.css'
import { useState, useRef, useEffect } from 'react'

const LOCAL_STORAGE_KEY = "shopping_list"
const storedItems = []
const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
//if (storedData) storedItems.push(...storedData)
storedData.forEach( (it) => {
  if (Array.isArray(it)) {
     storedItems.push(it) // assumed: [checked, text]
  } else {
    storedItems.push([false, it])
  }
})



function ListItem({ item, onChange }) {
  //const [checked, setChecked] = useState(false)
  const ckRef = useRef()
  function handleChange(e) {
    const v=e.target.checked
    const [, text]=item
    console.log("checkbox for ", text, " is:", v)
    //if (onChange && typeof onChange == 'function') onChange(v)
    item[0]=v //update value
  }

  return (<li>
    <label><input ref={ckRef} type="checkbox" onChange={handleChange} />&nbsp; {item[1]}</label>
  </li>)
}

function List(props) {

  const c = props.color || "darkred"
  return (
    <ul className="ulist" style={{ color: c }}>
      {/* props.items.map( (item,i) => <li key={i}> {item}</li> ) */
        props.items.map((item, i) => <ListItem key={JSON.stringify(item)} item={item} onChange={props.onChange}/>)
      }
    </ul>
  )
}

function App() {
  let date = new Date().toLocaleString()
  const [items, setItems] = useState(storedItems)
  //items is an array of [checked, itemText]
  const inputRef = useRef()

  useEffect(() => {
    console.log(" ..... storing to local storage: ", items)
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  })

  //console.log("........... rendering  with items =", items)
  function addItem(e) {
    const inputbox = inputRef.current //that's how we access the current reference variable (sic!)
    const newitem = inputbox.value
    if (newitem.trim().length === 0) return
    //console.log("Button clicked, adding ", newitem)
    setItems([...items, [false, newitem] ]) // !! request a STATE UPDATE here!!
    inputbox.value = "" //clear the input box to make it ready for next input
  }

  function clearList() { setItems([]) } //are you sure?

  return (
    <div className="App">
      <div className="content">
        <h3>Date is: {date}</h3>
        <List items={items} />
      </div>
      <div className="input-area">
        <label>Enter item: <input ref={inputRef} type="text" id="txtIn" /> </label>
        <button type="button" onClick={addItem}>Add item</button>
      </div>
      <div>
        <button type="button" onClick={clearList}>Clear list!</button>
      </div>
    </div>
  )
}

export default App;
