import React from "react";
import CharacterLink from "./CharacterLink";

const PlanetCharacterGroup = (props) => {
    return (
        <section id="characters">
            <h2 id="seen-on">Characters seen on {props.planet.name}</h2>
            <div className="card-container" id='character-list' style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>{
                props.characters.map((character) => (
                    <CharacterLink key={character.id} data={character} />
                ))
            }</div>
        </section>
    );
};

export default PlanetCharacterGroup;