import React, { useState } from 'react';
import {
    Route,
    Routes,
    useNavigate
} from 'react-router-dom';

import Game from '../Pages/Game';
import Help from '../Pages/Help';
import Intro from '../Pages/Intro';
import LoadGame from '../Pages/LoadGame';
import NewGame from '../Pages/NewGame';
import Settings from '../Pages/Settings';

import Classes from '../../constants/Classes';

const Main = props => {
    // Probably import the default structure here instead of making this literally
    const [gameState, setGameState] = useState({
        firstTimeSkills: true,
        playerClass: null
    });

    const navigate = useNavigate();

    const confirmClass = className => {
        // Persist this somewhere real later
        setGameState({
            ...gameState,
            playerClass: className
        });

        navigate('/game');
    };

    return (
        <div id="main">
            <Routes>
                <Route exact path="/" element={<Intro/>} />
                <Route path="/new" element={<NewGame classes={Object.values(Classes)} confirmClass={confirmClass}/>} /> 
                <Route path="/load" element={<LoadGame/>} /> 
                <Route path="/help" element={<Help/>} /> 
                <Route path="/settings" element={<Settings/>} /> 
                <Route path="/game" element={<Game gameState={gameState} setFooter={props.setFooter}/>} />
            </Routes>
        </div>
    )
};

export default Main;