import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(10)
  const addValue = ()=>{
    if(count<20){
    setCount(count+1);
    }
  }
  const minusValue = () => {
    if(count>0){
    setCount(count-1);
    }
  }

  return (
    <>
    <h2>counter{count} </h2>
       <button 
       onClick={addValue}>Add</button>
       <br/>
       <button
       onClick={minusValue}>Minus</button>
    </>
  )
}

export default App
