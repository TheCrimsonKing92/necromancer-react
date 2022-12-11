import { CHOOSE_CLASS } from "../Scenes";

const DEFAULT_GAME_STATE = {
    player: {
        class: null,
        stats: {
            health: {
                head: {
                    conditions: [],
                    wounds: []
                },
                torso: {
                    conditions: [],
                    wounds: []
                },
                arms: {
                    left: {
                        conditions: [],
                        wounds: []
                    },
                    right: {
                        conditions: [],
                        wounds: []
                    }
                },
                legs: {
                    left: {
                        conditions: [],
                        wounds: []
                    },
                    right: {
                        conditions: [],
                        wounds: []
                    }
                }
            },
            charisma: 1,
            constitution: 1,
            dexterity: 1,
            intelligence: 1,
            strength: 1,
            wisdom: 1       
        },
        skills: {}
    },
    scene: CHOOSE_CLASS
};

export default DEFAULT_GAME_STATE;