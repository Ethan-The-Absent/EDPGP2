import Character from "./Character"

const Characters = (props) =>{
    return (
        <>
            <div className="card-container" style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {
                    props.data.map((character) => (
                        <Character key={character.id} data={character}></Character>
                    ))
                }
            </div>
        </>
    );
};

export default Characters;