import { describe, expect, test } from '@jest/globals';
import { createMachine, interpret } from 'xstate';
import gameConfig from '../../data/scenes.json';

describe("Game state machine", () => {
    test.skip("Starts in character creation", () => {
        const gameMachine = createMachine(gameConfig);
        const service = interpret(gameMachine).start();

        expect(service.state.value).toBe("character_creation");
    });

    test.skip("Character selection transitions to intro", () => {
        const gameMachine = createMachine(gameConfig);
        const service = interpret(gameMachine).start();

        service.send({ type: "CHOOSE_CHARACTER", characterClass: "medium", nextScene: "intro" });
        expect(service.state.value).toBe("intro");
    });
});