import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import ErrorLoading from "./ErrorLoading";
import FilmCharacterGroup from "./FilmCharacterGroup";
import FilmPlanetGroup from "./FilmPlanetGroup";


const api = import.meta.env.VITE_API_URL



const Film = (props) => {
    try {
        const { id } = useParams();
        const idNumber = Number(id)
        if (isNaN(idNumber) || idNumber > 100) {
            throw new Error('Invalid ID');
        }
        const [data, setData] = useState([]);
        const [characters, setCharacters] = useState([]);
        const [planets, setPlanets] = useState([]);
        useEffect(() => {
            const fetchFilm = async () => {
                try {
                    const response = await fetch(`${api}films/${idNumber}`) // to replace with env
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
                    const response = await fetch(`${api}films/${idNumber}/characters`)
                    if (!response.ok) {
                        throw new Error('Data could not be fetched');
                    }
                    const json_response = await response.json();
                    setCharacters(json_response);
                } catch (error) {
                    console.error('Error Fetching Data: ', error)
                }
            }

            const fetchPlanets = async () => {
                try {
                    const response = await fetch(`${api}films/${idNumber}/planets`)
                    if (!response.ok) {
                        throw new Error('Data could not be fetched');
                    }
                    const json_response = await response.json();
                    setPlanets(json_response);
                } catch (error) {
                    console.error('Error Fetching Data: ', error)
                }
            }

            fetchFilm();
            fetchCharacters();
            fetchPlanets();
        }, []
        );


        return (
            <>
                <main>
                    <h1 id="title">{data.title}</h1>
                    <section id="generalInfo">
                        <p>Released: <span id="released_year">{data.release_date}</span></p>
                        <p>Director: <span id="director">{data.director}</span></p>
                        <p>Episode: <span id="episode">{data.episode_id}</span></p>
                    </section>

                    <FilmCharacterGroup film={data} characters={characters} />
                    <FilmPlanetGroup film={data} planets={planets} />
                </main>
            </>
        );
    } catch {
        return (
            <ErrorLoading />
        );
    }
};

export default Film;