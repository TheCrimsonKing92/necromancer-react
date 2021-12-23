import React from 'react';
import SkillButton from '../../SkillButton';

const Game = props => {
    let { setFooter } = props;
    let { firstTimeSkills, playerClass } = props.gameState;
    let className = playerClass.name;

    const banish = {
        name: 'Banish',
        description: 'Banishes lesser undead from this plane. Has no effect on the living, constructs, or greater undead.',
        tree: 'Combat Skills',
        cost: '1 skill point'
    };

    const boneShield = {
        name: 'Bone Shield',
        description: 'Provides a shield with limited health, effective against physical damage.',
        tree: 'Necromancer Combat Skills',
        cost: '1 skill point'
    };

    return (
        <>
            <h2>Skills</h2>
            {
                firstTimeSkills &&
                <>
                    <p>You have picked <strong>{className}</strong> as your class! Let's get started by choosing your first skill.</p>
                    <SkillButton setFooter={setFooter} skill={banish} />
                    <SkillButton setFooter={setFooter} skill={boneShield} />
                </>
            }
        </>
    )
};

export default Game;