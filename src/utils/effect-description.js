import { EffectTypes } from "../game/constants";

export const describeEffect = (user, target, effect, initialState, updatedAttributes) => {
    const { type } = effect;

    switch (type) {
        case EffectTypes.DAMAGE:
            const damageTaken = initialState.health - updatedAttributes.health;
            return `${user.name} dealt ${damageTaken} damage to ${target.name}.`;
        
        case EffectTypes.HEALING:
            const healing = updatedAttributes.health - initialState.health;
            return `${user.name} healed ${target.name} for ${healing} health.`;

        case EffectTypes.STATUS:
            const newEffect = updatedAttributes.statusEffects.find(status => !initialState.statusEffects.includes(status));
            return `${target.name} is now affected by ${newEffect.type}`;

        default:
            return `${user.name} used an unknown effect on ${target.name}.`;
    }
};