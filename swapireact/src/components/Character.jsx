import React from "react";

const Character = (props) => {
    const link = `/characters/${props.data.id}`
    return(
        <div className="card">
            <a href={link}>{props.data.name}</a>
        </div>
    );
};
export default Character;