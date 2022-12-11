import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = props => {
    const navigate = useNavigate();
    return (
        <>
            <h2>Welcome to Necromancer!</h2>
            <p>
                <strong>Necromancer</strong> is a turn-based, narrative-driven, RPG with hardcore elements. Walk the land of Maldirin as a lowly conjuror,
                seeking power amongst decadence, nobility, chaos, and splendor.
            </p>
            <p>
                Click below to choose your class and begin the game. Classes start with access to unique abilities and small existing faction ties, but otherwise
                have little effect on the overall course of gameplay.
            </p>
            <button type="button" className="hover-pointer standard-button" onClick={() => navigate('/game')}>
                Start!
            </button>
        </>
    )
};

export default Intro;