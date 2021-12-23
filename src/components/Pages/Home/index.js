import React, { useState } from 'react';

const Home = props => {

    const [chosenClass, setChosenClass] = useState(null);

    let classDisplay;
    if (chosenClass === null) {
        classDisplay = <p>You have not chosen a class.</p>
    } else {
        classDisplay = <p>You have chosen ${chosenClass}</p>
    }

    return 
        <div id ="home-container">
            <h2>Welcome to <strong>Necromancer</strong>!</h2>
            {{ classDisplay }}
        </div>;
};

export default Home;