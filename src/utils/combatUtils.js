import { TargetType } from "../game/targeting";

export const performAttack = (context, { weapon, attacker, targets }) => {
    const { battleLog, ...rest } = context;

    const { descriptions, updatedEntities: entities } = weapon.attack(context.entities, attacker, targets);

    return {
        ...rest,
        battleLog: [...battleLog, ...descriptions],
        entities
    };
};

export const useSkill = (context, { skill, user, targets }) => {
    const { battleLog, ...rest } = context;

    const { descriptions, updatedEntities: entities } = skill.effect(context.entities, user, targets);

    return {
        ...rest,
        battleLog: [...battleLog, ...descriptions],
        entities
    };
};

export const useItem = (context, { item, user, targets }) => {
    const { battleLog, ...rest } = context;

    const { descriptions, updatedEntities: entities } = item.effect(context.entities, user, targets);

    return {
        ...rest,
        battleLog: [...battleLog, ...descriptions],
        entities
    };
};

export const attemptFlee = () => Math.random() < 0.5;

export const getValidTargets = (user, characters, targetType) => {
    switch (targetType) {
        case TargetType.ALLY:
            return characters.filter(character => character.team === user.team && character !== user);
        case TargetType.CHARACTER:
            return characters;
        case TargetType.ENEMY:
            return characters.filter(character => character.team !== user.team);
        case TargetType.SELF:
            return [ user ];
        default:
            return [];
    };
};

// TODO: Some skills might be able to apply more than once in a given execution, handle that here
export const getRandomTargets = (validTargets, targetCount) => {
    const toSelect = Math.max(validTargets.length, targetCount);

    if (validTargets.length === toSelect) {
        return validTargets;
    }

    const selectedIndices = [];

    for (let selected = 0; selected < toSelect; selected++) {
        let nextIndex = Math.floor(Math.random() * validTargets.length);

        while (selectedIndices.includes(nextIndex)) {
            nextIndex = Math.floor(Math.random() * validTargets.length);
        }

        selectedIndices.push(nextIndex);
    }

    return validTargets.filter((value, index) => selectedIndices.includes(index));
};