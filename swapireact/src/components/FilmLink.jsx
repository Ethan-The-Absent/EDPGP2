import React from "react";
import { Link } from "react-router-dom";

const FilmLink = (props) => {
    const link = `/film/${props.data.id}`
    return(
        <div className="card">
            <Link to={link}>{props.data.title}</Link>
        </div>
    );
};
export default FilmLink;