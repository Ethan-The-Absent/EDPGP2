import React from "react";
import PlanetLink from "./PlanetLink";

const FilmPlanetGroup = (props) => {
    return (
        <section id="planets">
            <h2 id="seen-on">Planets</h2>
            <div className="card-container" id='planet-list' style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>{
                props.planets.map((planet) => (
                    <PlanetLink key={planet.id} data={planet} />
                ))
            }</div>
        </section>
    );
};

export default FilmPlanetGroup;