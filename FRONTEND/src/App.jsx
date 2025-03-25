import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AuthenticationPage from './pages/AuthenticationPage'

function App() {

  return (
    <Router>
      <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/auth' element={<AuthenticationPage/>}></Route>
      <Route path='/' element={<HomePage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
