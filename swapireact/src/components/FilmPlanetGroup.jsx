import React from "react";
import PlanetLink from "./PlanetLink";

const FilmPlanetGroup = (props) => {
    return (
        <section id="planets">
            <h2 id="seen-on">Planets</h2>
            <span id="planet-list">{
                props.planets.map((planet) => (
                    <PlanetLink key={planet.id} data={planet} />
                ))
            }</span>
        </section>
    );
};

export default FilmPlanetGroup;