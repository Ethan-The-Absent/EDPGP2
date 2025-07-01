import React from "react";
import { Link } from "react-router-dom";

const PlanetLink = (props) => {
    const link = `/planet/${props.data.id}`
    return(
        <div className="card">
            <Link to={link}>{props.data.name}</Link>
        </div>
    );
};
export default PlanetLink;