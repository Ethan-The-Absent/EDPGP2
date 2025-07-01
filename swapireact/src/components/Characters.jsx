import CharacterLink from "./CharacterLink"
import { useState, useEffect } from 'react'

const Characters = () =>{
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters/`) // to replace with env
                if (!response.ok) {
                  throw new Error('Data could not be fetched');
                }
                const json_response = await response.json();
                setData(json_response);
              } catch (error) {
                console.error('Error Fetching Data: ', error)
                }
              }
            fetchCharacter();
        }, []
    );

    return (
        <>
            <div className="card-container" style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {
                    data.map((character) => (
                        <CharacterLink key={character.id} data={character}/>
                    ))
                }
            </div>
        </>
    );
};

export default Characters;