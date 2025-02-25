import React, { useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { loadGameMachine } from '../fsm/gameMachine';
import CharacterSelect from '../views/CharacterSelect';

const SceneDisplay = () => {
    const [ state, send ] = useMachine(loadGameMachine);
    const [ scenes, setScenes ] = useState({});

    useEffect(() => {
        fetch('/scenes.json')
            .then(response => response.json())
            .then(data => setScenes(data.states));
    }, []);

    const currentScene = scenes[state.context.scene];

    if (!currentScene) {
        return <p>Loading...</p>;
    }

    const handleOptionClick = (option) => {
        send({ type: "CHOOSE_OPTION", nextScene: option.next });
    };

    const renderScene = () => {
        switch (currentScene.type) {
            case "selection":
                return <CharacterSelect send={send} options={currentScene.options} />
            case "text":
                return (
                    <div>
                        <p>{ currentScene.text }</p>
                        { currentScene.options.map((option, index) => (
                            <button key={index} onClick={ () => handleOptionClick(option) }>
                                { option.text }
                            </button>
                        ))}
                    </div>
                );
            case "battle":
                return <p>Battle UI Placeholder</p>; // Future implementation
            default:
                return <p>Unknown scene type</p>;
        }
    };

    return (
        <div>
            { renderScene() }
        </div>
    );
};

export default SceneDisplay;