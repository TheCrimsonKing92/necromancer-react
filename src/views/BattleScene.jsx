import React, { useState } from 'react';
import Button from '../components/Button';
import GameFrame from './GameFrame';
import { getValidTargets, attemptFlee, performAttack } from '../utils/combatUtils';

const BattleScene = ({ player, enemies, onBattleUpdate, onBattleEnd }) => {
    const [ currentAction, setCurrentAction ] = useState(null);
    const [ selectedTargets, setSelectedTargets ] = useState([]);

    const handleSelectTarget = (target) => {
        // Assume single target selection for action
        setSelectedTargets([ target ]);
    };

    const handleConfirmAction = () => {
        if (currentAction === 'attack') {
            if (selectedTargets.length === 0) return;

            console.log('Attacking target:', selectedTargets[0]);
            // onBattleUpdate would receive the updated battle context.
            onBattleUpdate && onBattleUpdate({ action: 'attack', target: selectedTargets[0] });
        } else if (currentAction === 'flee') {
            if (attemptFlee()) {
                alert("You fled successfully!");
                onBattleEnd && onBattleEnd({ outcome: 'fleeSuccess' });
            } else {
                alert("Flee failed, battle continues!");
                onBattleUpdate && onBattleUpdate({ action: 'fleeFailed' });
            }
        }

        setCurrentAction(null);
        setSelectedTargets([]);
    };

    let actionContent = null;
    if (!currentAction) {
        actionContent = (
            <div style={{ marginTop: '1rem' }}>
                <h3>Actions:</h3>
                <Button onClick={() => setCurrentAction('attack')}>Attack</Button>
                <Button onClick={() => setCurrentAction('skill')}>Use Skill</Button>
                <Button onClick={() => setCurrentAction('item')}>Use Item</Button>
                <Button onClick={() => setCurrentAction('flee')}>Flee</Button>
            </div>            
        );
    } else if (currentAction === 'attack') {
        const validTargets = getValidTargets(player, enemies, 'enemy'); // Assuming targetType 'enemy'
        actionContent = (
            <div>
                <h3>Select Target to Attack:</h3>
                {validTargets.map((target) => (
                    <Button key={target.id} onClick={() => handleSelectTarget(target)}>
                        {target.name} (HP: {target.stats.health}/{target.stats.maxHealth})
                    </Button>
                ))}
                <div style={{ marginTop: '1rem' }}>
                    <Button onClick={handleConfirmAction} disabled={selectedTargets.length === 0}>
                        Confirm Attack
                    </Button>
                    <Button onClick={() => setCurrentAction(null)}>Cancel</Button>
                </div>
            </div>
        );
    } else if (currentAction === 'flee') {
        actionContent = (
            <div>
                <h3>Attempt to Flee?</h3>
                <Button onClick={handleConfirmAction}>Confirm Flee</Button>
                <Button onClick={() => setCurrentAction(null)}>Cancel</Button>
            </div>
        );
    } else if (currentAction === 'skill') {
        actionContent = (
            <div>
                <h3>Select Skill (Not implemented yet)</h3>
                <Button onClick={() => setCurrentAction(null)}>Cancel</Button>
            </div>
        );
    } else if (currentAction === 'item') {
        actionContent = (
            <div>
                <h3>Select Item (Not implemented yet)</h3>
                <Button onClick={() => setCurrentAction(null)}>Cancel</Button>
            </div>
        );
    }

    return (
        <GameFrame character={player}>
            <h2>Battle!</h2>
            <div>
                <h3>Stats:</h3>
                <p>Health: {player.stats.health} / {player.stats.maxHealth}</p>
            </div>
            <div>
                <h3>Enemies:</h3>
                { enemies.map((enemy, index) => (
                    <div key={enemy.id || index}>
                        <p>{enemy.name} (Level {enemy.level} {enemy.characterClass}) - {enemy.stats.health} / {enemy.stats.maxHealth}</p>
                    </div>
                ))}
            </div>
            {actionContent}
        </GameFrame>
    );
};

export default BattleScene;