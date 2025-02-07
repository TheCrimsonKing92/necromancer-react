import { createMachine, assign } from 'xstate';

export function createBattleMachine({ enemies, environment, originScene }) {
    return createMachine({
        id: "battle",
        initial: "inCombat",
        context: {
            enemies,
            environment,
            originScene,
            // dynamic injection
            player: null,
            battleLog: [],
            rewards: null
        },
        states: {
            inCombat: {
                on: {
                    ATTACK: {
                        actions: assign((ctx, event) => performAttack(ctx, event))
                    },
                    USE_SKILL: {
                        actions: assign((ctx, event) => useSkill(ctx, event))
                    },
                    USE_ITEM: {
                        actions: assign((ctx, event) => useItem(ctx, event))
                    },
                    FLEE: [
                        { cond: "successfulFlee", target: (ctx) => `#game.${ctx.originScene }`},
                        { target: "enemyTurn", actions: "logFailedFlee" }
                    ],
                    ENEMY_TURN: {
                        target: "enemyTurn"
                    }
                }
            },
            enemyTurn: {
                entry: "performEnemyTurn",
                after: {
                    1000: "inCombat" // Simulated delay
                }
            },
            victory: {
                entry: [ "applyRewards" ],
                on: { CONTINUE: { target: (ctx) => `#game.${ctx.originScene}` } }
            },
            defeat: {
                on: { CONTINUE: "#game.gameOver" }
            }
        },
        guards: {
            successfulFlee: (ctx, event) => attemptFlee(ctx, event)
        },
        actions: {
            logFailedFlee: assign((ctx) => ({
                battleLog: [ ...ctx.battleLog, "You failed to flee!" ]
            })),
            performEnemyTurn: assign((ctx) => {
                // TODO: Impleement enemy AI logic
                return ctx;
            })
        }
    });
};