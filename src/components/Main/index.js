import React, { useReducer } from 'react';
import {
    Route,
    Routes,
    useNavigate
} from 'react-router-dom';

import Game from '../Pages/Game';
import Help from '../Pages/Help';
import Intro from '../Pages/Intro';
import LoadGame from '../Pages/LoadGame';
import Settings from '../Pages/Settings';

const Main = props => {
    const { dispatch, game } = props;

    return (
        <div id="main">
            <Routes>
                <Route exact path="/" element={<Intro/>} />
                <Route path="/load" element={<LoadGame/>} /> 
                <Route path="/help" element={<Help/>} /> 
                <Route path="/settings" element={<Settings/>} /> 
                <Route path="/game" element={<Game dispatch={dispatch} game={game}/>} />
            </Routes>
        </div>
    )
};

export default Main;