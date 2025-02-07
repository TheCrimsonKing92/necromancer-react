export function generateVictoryRewards({ enemies, environment }) {
    return {
        loot: determineLoot(enemies),
        xp: enemies.map(enemy => enemy.xp).reduce((total, current) => total + current, 0),
        storyFlag: checkStoryTriggers()
    };
};