import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import PlanetCharacterGroup from "./PlanetCharacterGroup";
import PlanetFilmGroup from "./PlanetFilmGroup";
import ErrorLoading from "./ErrorLoading";


const api = import.meta.env.VITE_API_URL



const Planet = (props) => {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [films, setFilms] = useState([]);
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {

        const idNumber = Number(id)

        const fetchPlanet = async () => {
            try {
                const response = await fetch(`${api}planets/${idNumber}`) // to replace with env
                if (!response.ok) {
                    throw new Error('Data could not be fetched');
                }
                const json_response = await response.json();
                setData(json_response);
            } catch (error) {
                setLoaded(false);
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
                setLoaded(false);
                console.error('Error Fetching Data: ', error)
            }
        }

        const fetchFilms = async () => {
            try {
                const response = await fetch(`${api}planets/${idNumber}/films`)
                if (!response.ok) {
                    throw new Error('Data could not be fetched');
                }
                const json_response = await response.json();
                setFilms(json_response);
            } catch (error) {
                setLoaded(false);
                console.error('Error Fetching Data: ', error)
            }
        }

        if (isNaN(idNumber) || idNumber > 100 || id < 1) {
            setLoaded(false);
            console.error("Invalid ID");
        } else {
            fetchPlanet();
            fetchCharacters();
            fetchFilms();
        }
    }, []
    );

    if (loaded) {
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

                    <PlanetCharacterGroup planet={data} characters={characters} />
                    <PlanetFilmGroup planet={data} films={films} />
                </main>
            </>
        );
    }

    return (
        <ErrorLoading />
    );
};

export default Planet;