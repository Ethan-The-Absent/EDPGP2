import React from "react";
import { Link } from "react-router-dom";

const CharacterLink = (props) => {
    const link = `/character/${props.data.id}`
    return(
        <div className="card">
            <Link to={link}>{props.data.name}</Link>
        </div>
    );
};
export default CharacterLink;