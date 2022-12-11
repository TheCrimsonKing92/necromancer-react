import React from 'react';
import Container from 'react-bootstrap/Container';
import NewGame from '../NewGame';
import SkillSelection from './SkillSelection';

import Classes from '../../../constants/Classes';
import SCENES from '../../../constants/Scenes';

const { CHOOSE_CLASS, CHOOSE_SKILL } = SCENES;

const Game = props => {
    const { dispatch } = props;
    const { scene } = props.game;

    const chooseScene = scene => {
        switch(scene) {
            case CHOOSE_CLASS:
                return <NewGame classes={Object.values(Classes)} dispatch={dispatch}/>;
            case CHOOSE_SKILL:                
                const { player } = props.game;
                const className = player.class.name;
                const firstTimeSkills = Object.keys(player.skills).length === 0;
                return <SkillSelection className={className} dispatch={dispatch} firstTimeSkills={firstTimeSkills} />;
            default:
                return <p>I don't know what kinda scene you're tryna make here ({scene})</p>
        }
    };

    const content = chooseScene(scene);

    return (    
        <Container>
            {
                content 
            }
        </Container>
    );
};

export default Game;