import React from 'react';
import SkillSelection from './SkillSelection';

const Game = props => {
    const { setFooter } = props;
    const { firstTimeSkills, playerClass } = props.gameState;
    const className = playerClass.name;

    return (
        <SkillSelection className={className} firstTimeSkills={firstTimeSkills} setFooter={setFooter} />
    );
};

export default Game;