import React from "react";
import FilmLink from "./FilmLink";


const PlanetFilmGroup = (props) => {
    return (
        <section id="characters">
            <h2 id="seen-on">Films appeared in</h2>
            <div className="card-container" id='film-list' style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>{
                props.films.map((film) => (
                    <FilmLink key={film.id} data={film} />
                ))
            }</div>
        </section>
    );
};

export default PlanetFilmGroup;