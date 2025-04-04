import React from 'react';
import Button from '../components/Button';
import GameFrame from './GameFrame';

const InnScene = ({ character, onContinue }) => (
    <GameFrame character={ character }>
        <h2>The Weary Traveler Inn</h2>
        <p>
        You awaken in a modest inn room, the soft murmur of conversation and clinking glasses drifting through thin walls. The room is humble yet tidy—a small sanctuary for those on long journeys.
        </p>
        <p>
        Outside your window, the early morning light reveals a worn sign reading "The Weary Traveler." It hints at countless souls passing through this haven, each with their own tale.
        </p>
        <p>
        As you gather your thoughts, you realize it's time to step out and face whatever adventures (or dangers) await in the world beyond these walls.
        </p>
        <Button onClick={onContinue}>Step Outside</Button>
    </GameFrame>
);

export default InnScene;