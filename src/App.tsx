import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Products from './components/Products'
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

        <Header />
        <Products />


      </div>

    </>
  )
}

export default App
