import { useState, useEffect } from 'react'
import './App.css'

import Characters from './components/Characters'
import Character from './components/Character';
import Planet from './components/Planet';
import Film from './components/Film';

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
            <Route path="/planet/:id" element={<Planet />}/>
            <Route path="/film/:id" element={<Film />}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
