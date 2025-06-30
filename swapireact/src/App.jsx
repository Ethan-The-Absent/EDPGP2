import { useState, useEffect } from 'react'
import './App.css'

import Characters from './components/Characters'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  //const [page, setPage] = useState(1);
  useEffect(() => {
  const fetchCharacters = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/characters`) // to replace with env
      if (!response.ok) {
        throw new Error('Data could not be fetched');
      }
      const json_response = await response.json();
      setData(json_response);
    } catch (error) {
      console.error('Error Fetching Data: ', error)
      }
    }
  
    fetchCharacters();
  }
)
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
            <Route exact path="/" element={<Characters data={data}/>}/>
            <Route path="/planet" element={<div>Planet</div>}/>
            <Route path="/film" element={<div>Film</div>}/>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
