import React from 'react';
import Button from '../components/Button';
import GameFrame from './GameFrame';

const BattleScene = ({ player, enemies, onBattleEnd }) => (
    <GameFrame character={player}>
        <h2>Battle!</h2>
        <div>
            <h3>Stats:</h3>
            <p>Health: {player.stats.health} / {player.stats.maxHealth}</p>
        </div>
        <div>
            <h3>Enemies:</h3>
            { enemies.map((enemy, index) => (
                <div key={index}>
                    <p>{enemy.name} the {enemy.characterClass}</p>
                </div>
            ))}
        </div>
        <Button onClick={onBattleEnd}>Fight!</Button>
    </GameFrame>
);

export default BattleScene;