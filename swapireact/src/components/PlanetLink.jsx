import React from "react";

const PlanetLink = (props) => {
    const link = `/planet/${props.data.id}`
    return(
        <div className="card">
            <a href={link}>{props.data.name}</a>
        </div>
    );
};
export default PlanetLink;