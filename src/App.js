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
  const ckRef = useRef()

  let id=`${(0+item[0])}.${item[1]}`
  function handleChange(e) {
    const v=e.target.checked   
    if (onChange && typeof onChange == 'function') onChange(v)
    item[0]=v //update value directly! (but React is not aware of the state change)
  }

  return (<li>
       <input ref={ckRef} id={id} type="checkbox" onChange={handleChange} checked={item[0]} />
       <label htmlFor={id}> {item[1]} </label>
  </li>)
}

function List(props) {

  const c = props.color || "darkred"
  return (
    <ul className="ulist" style={{ color: c }}>
     {
      props.items.map((item, i) => <ListItem key={JSON.stringify(item)} item={item} onChange={props.onChange}/>)
     }
    </ul>
  )
}

function App() {
  let date = new Date().toLocaleString()
  const [items, setItems] = useState(storedItems)
  //items is an array of [checked, itemText]

  //force state update when a list item notifies parents about a checkbox action
  const [flip, forceUpdate] = useState(false) 
  
  const inputRef = useRef() //reference to DOM of input box

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items))
  })

  //console.log("........... rendering  with items =", items)
  function addItem(e) {
    const inputbox = inputRef.current //that's how we access the current reference variable (sic!)
    const newitem = inputbox.value.trim()
    if (newitem.length === 0) return
    //only add the new item if not already there
    for (let i=0;i<items.length;i++) 
      if (items[i][1].toLowerCase()===newitem.toLowerCase()) {
        console.log(` item "${newitem}" already on the list!`)
        inputbox.value=""
        return
      } 
    setItems([...items, [false, newitem] ]) // !! request a STATE UPDATE here
    inputbox.value = "" //clear the input box to make it ready for next input
  }

  function handleEnter(e) {
    if (e.key === 'Enter')
         addItem(e)
  }

  function clearList() { setItems([]) } //are you sure?

  function clearChecked() {
      const unchecked=[]
      items.forEach( (it)=> {
        if (!it[0]) unchecked.push(it)
      })
      setItems(unchecked)
  }

  function checkChange() { forceUpdate(!flip) }

  return (
    <div className="App">
      <div className="content">
        <h3>Date is: {date}</h3>
        <List items={items} onChange={checkChange} />
      </div>
      <div className="input-area">
        <label>Enter item: &nbsp;<input ref={inputRef} type="text" id="txtIn" onKeyDown={handleEnter}/> </label>
        &nbsp;&nbsp;<button type="button" onClick={addItem}>Add item</button>
      </div>
      <div>
        <button type="button" onClick={clearList}>Clear All!</button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button type="button" onClick={clearChecked}>Clear checked</button>
      </div>
    </div>
  )
}

export default App;
