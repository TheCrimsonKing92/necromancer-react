import React from 'react';
import Button from '../components/Button';

const HomeScreen = ({ startNewGame, loadGame }) => (
    <div>
        <h1>Necromancer</h1>
        <Button onClick={startNewGame}>New Game</Button>
        <Button onClick={loadGame}>Load Game</Button>
    </div>
);

export default HomeScreen;