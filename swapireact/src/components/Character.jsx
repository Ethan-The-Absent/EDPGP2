import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import ErrorLoading from "./ErrorLoading";

const api = import.meta.env.VITE_API_URL

const Character = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const [planetData, setPlanetData] = useState([]);
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const idNumber = Number(id)
                if (isNaN(idNumber) || idNumber > 100){
                    throw new Error('Invalid ID');
                }

                const response = await fetch(`${api}characters/${id}`) // to replace with env
                if (!response.ok) {
                  throw new Error('Data could not be fetched');
                }
                const json_response = await response.json();
                setData(json_response);
                const p_response = await fetch(`${api}planets/${json_response.homeworld}`)
                if (!response.ok) {
                    throw new Error('Planet data could not be fetched');
                }
                const p_json_response = await p_response.json();
                setPlanetData(p_json_response)
                
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
        <a href={planet_link}>
        <button className="card">Homeworld: {planetData.name}</button>
        </a>
        <div className="card-container" style={{display: 'flex', flexWrap: 'wrap', gap: '2px'}}>
            <div className="card">Gender: {data.gender}</div>
            <div className="card">Skin: {data.skin_color}</div>
            <div className="card">Hair: {data.hair_color}</div>
            <div className="card">Eye Color: {data.eye_color}</div>
            <div className="card">Mass: {data.mass}kg</div>
            <div className="card">Birth Year: {data.birth_year}</div>
            <div className="card">Height: {data.height}cm</div>
        </div>
        </>
    );}

    return(<ErrorLoading/>);
}
export default Character;