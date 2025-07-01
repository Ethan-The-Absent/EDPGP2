import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import PlanetCharacterGroup from "./PlanetCharacterGroup";


const api = import.meta.env.VITE_API_URL



const Planet = (props) => {
    try {
        const { id } = useParams();
        const idNumber = Number(id)
        if (isNaN(idNumber) || idNumber > 100) {
            throw new Error('Invalid ID');
        }
        const [data, setData] = useState([]);
        const [characters, setCharacters] = useState([]);
        useEffect(() => {
            const fetchPlanet = async () => {
                try {
                    const response = await fetch(`${api}planets/${idNumber}`) // to replace with env
                    if (!response.ok) {
                        throw new Error('Data could not be fetched');
                    }
                    const json_response = await response.json();
                    setData(json_response);
                } catch (error) {
                    console.error('Error Fetching Data: ', error)
                }
            }

            const fetchCharacters = async () => {
                try {
                    const response = await fetch(`${api}planets/${idNumber}/characters`)
                    if (!response.ok) {
                        throw new Error('Data could not be fetched');
                    }
                    const json_response = await response.json();
                    setCharacters(json_response);
                } catch (error) {
                    console.error('Error Fetching Data: ', error)
                }
            }

            fetchPlanet();
            fetchCharacters();
            
        }, []
        );


        return (
            <>
                <main>
                    <h1 id="name">{data.name}</h1>

                    <section id="generalInfo">
                        <p>Population: <span id="population">{data.population}</span></p>
                        <p>Terrain type: <span id="terrain">{data.terrain}</span></p>
                        <p>Climate: <span id="climate">{data.climate}</span></p>
                        <p>Surface Water: <span id="surface-water">{data.surface_water}</span></p>
                        <p>Diameter: <span id="diameter">{data.diameter}</span> mi</p>
                        <p>Gravity: <span id="gravity">{data.gravity}</span> G</p>
                        <p>Rotation Period: <span id="rotation-period">{data.rotation_period}</span></p>
                        <p>Orbital: <span id="orbital">{data.orbital_period}</span> days</p>
                    </section>

                    <PlanetCharacterGroup planet={data} characters={characters}/>
                </main>
            </>
        );
    } catch {
        return (
            <div>There was a problem.</div>
        );
    }
};

export default Planet;