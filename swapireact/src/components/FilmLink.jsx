import React from "react";

const FilmLink = (props) => {
    const link = `/film/${props.data.id}`
    return(
        <div className="card">
            <a href={link}>{props.data.title}</a>
        </div>
    );
};
export default FilmLink;