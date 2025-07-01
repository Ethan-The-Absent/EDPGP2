import React from "react";
import CharacterLink from "./CharacterLink";

const PlanetCharacterGroup = (props) => {
    return (
        <section id="characters">
            <h2 id="seen-on">Characters seen on {props.planet.name}</h2>
            <span id="character-list">{
                props.characters.map((character) => (
                    <CharacterLink key={character.id} data={character} />
                ))
            }</span>
        </section>
    );
};

export default PlanetCharacterGroup;