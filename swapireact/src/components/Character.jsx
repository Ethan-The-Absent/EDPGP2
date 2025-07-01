import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import ErrorLoading from "./ErrorLoading";
import FilmLink from "./FilmLink";
import { Link } from "react-router-dom";

const api = import.meta.env.VITE_API_URL

const Character = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    const [filmData, setFilmData] = useState([]);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const idNumber = Number(id)
                if (isNaN(idNumber) || idNumber > 100 || id < 1) {
                    throw new Error('Invalid ID');
                }

                const response = await fetch(`${api}characters/${id}`)
                if (!response.ok) {
                    throw new Error('Data could not be fetched');
                }
                const json_response = await response.json();
                setData(json_response);

                const p_response = await fetch(`${api}planets/${json_response.homeworld}`)
                if (!p_response.ok) {
                    throw new Error('Planet data could not be fetched');
                }
                const p_json_response = await p_response.json();
                setPlanetData(p_json_response)

                const f_response = await fetch(`${api}characters/${id}/films`)
                if (!f_response.ok) {
                    throw new Error('Film data could not be fetched');
                }
                const f_json_response = await f_response.json();
                setFilmData(f_json_response);

                setLoaded(true)
            } catch (error) {
                setLoaded(false);
                console.error('Error Fetching Data: ', error)
            }
        }
        fetchCharacter();
    }, []
    );

    if (loaded) {
        const planet_link = `/planet/${planetData.id}`
        return (
            <>
                <h2>{data.name}</h2>
                <hr></hr>
                <Link to={planet_link}>
                    <button className="card">Homeworld: {planetData.name}</button>
                </Link>
                <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                    <div className="card">Gender: {data.gender}</div>
                    <div className="card">Skin: {data.skin_color}</div>
                    <div className="card">Hair: {data.hair_color}</div>
                    <div className="card">Eye Color: {data.eye_color}</div>
                    <div className="card">Mass: {data.mass}kg</div>
                    <div className="card">Birth Year: {data.birth_year}</div>
                    <div className="card">Height: {data.height}cm</div>
                </div>
                <h3>Films Appeared In:</h3>
                <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {
                        filmData.map((film) => (
                            <FilmLink key={film.id} data={film} />
                        ))
                    }
                </div>
            </>

        );
    } else {
        return (<ErrorLoading />);
    }

}
export default Character;