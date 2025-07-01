import { useState, useEffect } from 'react'
import './App.css'

import Characters from './components/Characters'
import Character from './components/Character';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  
  return (
    <>
      <Router>
        <nav className='navbar'>
          <li>
            <Link to="/">
            SWAPI SITE
            </Link>
          </li>
        </nav>
        <main>
          <Routes>
            <Route exact path="/" element={<Characters/>}/>
            <Route path="/character/:id" element={<Character/>}/>
            <Route path="/planet" element={<div>Planet</div>}/>
            <Route path="/film" element={<div>Film</div>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
