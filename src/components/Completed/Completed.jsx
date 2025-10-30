import React from "react";

// returns a completed todos message

const Completed = () => {
    return (
        <div className="Completed__message">
            <h2 className="Completed__header">Congratulations!</h2>
            <p className="Completed__text">You have completed all your tasks!</p>
        </div>
    )
}

export default Completed;