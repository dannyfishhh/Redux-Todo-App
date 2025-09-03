import React from "react";

// returns a completed todos message

const Completed = () => {
    return (
        <div className="completed-message">
            <h2 className="completed-header">Congratulations!</h2>
            <p className="completed-text">You have completed all your tasks!</p>
        </div>
    )
}

export default Completed;