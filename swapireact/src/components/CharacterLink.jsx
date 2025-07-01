import React from "react";

const CharacterLink = (props) => {
    const link = `/character/${props.data.id}`
    return(
        <div className="card">
            <a href={link}>{props.data.name}</a>
        </div>
    );
};
export default CharacterLink;