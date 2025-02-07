import { createMachine } from 'xstate';

export async function loadGameMachine() {
    const response = await fetch('/scenes.json');
    const gameConfig = await response.json();
    return createMachine(gameConfig);
};