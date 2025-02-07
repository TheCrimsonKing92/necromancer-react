import { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { loadGameMachine } from '../fsm/gameMachine';
import ChoiceScene from '../components/scenes/ChoiceScene';
import NarrativeScene from '../components/scenes/NarrativeScene';

const sceneComponents = {
    choice: ChoiceScene,
    narrative: NarrativeScene
};

export default function GameScreen() {
    const [ gameMachine, setGameMachine ] = useState(null);
    const [state, send ] = useMachine(gameMachine);

    useEffect(() => {
        loadGameMachine().then(setGameMachine);
    }, []);

    if (!gameMachine) {
        return <p>Loading Necromancer...</p>;
    }

    const scene = gameMachine.config.states[state.value];
    const SceneComponent = sceneComponents[scene.type] || NarrativeScene;

    return <SceneComponent text={ scene.text } choices={ scene.on } onChoose={ send } />;
};