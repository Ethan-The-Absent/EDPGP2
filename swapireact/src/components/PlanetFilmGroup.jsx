import React from "react";
import FilmLink from "./FilmLink";


const PlanetFilmGroup = (props) => {
    return (
        <section id="characters">
            <h2 id="seen-on">Films appeared in</h2>
            <span id="film-list">{
                props.films.map((film) => (
                    <FilmLink key={film.id} data={film} />
                ))
            }</span>
        </section>
    );
};

export default PlanetFilmGroup;