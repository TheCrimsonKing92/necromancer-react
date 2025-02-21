import { applyEffects } from "./applyEffects";
import { TargetType } from "../game/targeting";

const formatItemLog = (user, item, targets, descriptions) => `${user.name} used ${item.name} on ${targets.map(t => t.name).join(", ")}. ${descriptions.join(" ")}`;
const formatSkillLog = (user, skill, targets, descriptions) => `${user.name} used ${skill.name} on ${targets.map(t => t.name).join(", ")}. ${descriptions.join(" ")}`;
const formatWeaponLog = (attacker, weapon, targets, descriptions) => {
    const targetNames = targets.length > 1
        ? `${targets.slice(0, -1).map(t => t.name).join(", ")} and ${targets[targets.length - 1].name}`
        : targets[0].name;

    const descriptionText = descriptions.join(" ");

    return `${attacker.name} used ${weapon.name} on ${targetNames}. ${descriptionText}`;
};

export const performAttack = (context, { weapon, attacker, targets }) => {
    const { battleLog, ...rest } = context;

    const updates = Object.fromEntries(targets.map(target => [ target.id, weapon.attack(attacker, target) ]));
    const { descriptions, ...updatedEntities } = applyEffects(context, targets, updates);

    return {
        ...rest,
        battleLog: [ ...battleLog, formatWeaponLog(attacker, weapon, targets, descriptions) ],
        ... updatedEntities
    };
};

export const useSkill = (context, { skill, user, targets }) => {
    const { battleLog, ...rest } = context;

    const updates = Object.fromEntries(targets.map(target => [ target.id, skill.effect(user, target) ]))
    const { descriptions, ...updatedEntities } = applyEffects(context, targets, updates);

    return {
        ...rest,
        battleLog: [ ...battleLog, formatSkillLog(user, skill, targets, descriptions) ],
        ...updatedEntities
    };
};

export const useItem = (context, { item, user, targets }) => {
    const { battleLog,  ...rest } = context;    

    const updates = Object.fromEntries(targets.map(target => [ target.id, item.effect(user, target) ]));
    const { descriptions, ...updatedEntities } = applyEffects(context, targets, updates);

    return {
        ...rest,
        battleLog: [ ...battleLog, formatItemLog(user, item, targets, descriptions) ],
        ...updatedEntities
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