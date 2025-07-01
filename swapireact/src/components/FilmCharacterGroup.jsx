import React from "react";
import CharacterLink from "./CharacterLink";

const FilmCharacterGroup = (props) => {
    return (
        <section id="characters">
            <h2 id="seen-on">Characters</h2>
            <span id="character-list">{
                props.characters.map((character) => (
                    <CharacterLink key={character.id} data={character} />
                ))
            }</span>
        </section>
    );
};

export default FilmCharacterGroup;