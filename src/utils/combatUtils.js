export const performAttack = (context, { attacker, target }) => {
    const damage = Math.max(attacker.attack - target.defense, 1);
    const updatedEnemies = context.enemies.map(enemy => {
        if (enemy.id !== target.id) {
            return enemy;
        }

        return {
            ...enemy,
            health: enemy.health - damage
        };
    });

    const { battleLog } = context;
    return {
        ...context,
        battleLog: [ ...battleLog, `${attacker.name} attacked ${target.name} for ${damage} damage!` ],
        enemies: updatedEnemies
    };
};

export const useSkill = (context, { skill, user, target }) => {
    const effect = skill.effect(user, target);
    const updatedEnemies = context.enemies.map((enemy) => {
        if (enemy.id !== target.id) {
            return enemy;
        }

        return {
            ...enemy,
            health: enemy.health - effect.damage
        };
    });
  
    const { battleLog } = context;
    return {
      ...context,
      battleLog: [...context.battleLog, `${user.name} used ${skill.name}, dealing ${effect.damage} damage!`],
      enemies: updatedEnemies,
    };
};

export const useItem = (context, { item, user }) => {
    const { battleLog } = context;

    return {
        ...context,
        battleLog: [ ...battleLog, `${user.name} used ${item.name}. ${item.effectDescription}` ],
        player: item.applyAffect(context.player)
    };
};

export const attemptFlee = (context, event) => {
    return Math.random() < 0.5;
};