import {
    EffectTypes,
    ValidDamageTypes, ValidEffectTypes, ValidHealingTypes
} from "./constants";
import { StatusDefinitions, ValidStatusTypes } from "./statuses";
import { getDamageStat, getDefenseStat, getHealingStat } from "./stats";

const EffectDefinitions = {
    damage: {
        applyCondition: (user, target) => target.isAlive(),
        onApply: (user, target, { type: damageType, baseDamage }) => {
            const damageStat = getDamageStat(damageType);
            const defenseStat = getDefenseStat(damageType);
            const userDamage = user[damageStat] || 0;
            const targetDefense = target[defenseStat] || 0;
            const totalDamage = (userDamage + baseDamage) - targetDefense;
            const damage = Math.max(totalDamage, 1);
            const health = target.health - damage;

            return { health };
        }
    },

    healing: {
        applyCondition: (user, target) => target.isAlive() && target.health < target.maxHealth,
        onApply: (user, target, { type: healingType, baseHealing }) => {
            const healingStat = getHealingStat(healingType);
            const userHealing = user[healingStat] || 0;
            const totalHealing = userHealing + baseHealing;
            const healing = Math.min(totalHealing, target.maxHealth - target.health);
            const health = target.health + healing;

            return { health };
        }
    },

    status: {
        applyCondition: (user, target) => target.isAlive(),
        onApply: (user, target, { type, duration }) => {
            const statusEffect = { type, duration };
            const stackable = StatusDefinitions[type]?.stackable ?? false;
            const typeExists = target.statusEffects.find(effect => effect.type === type);

            // Add if stackable or no instance
            if (stackable || !typeExists) {
                return {
                    statusEffects: [
                        ...target.statusEffects,
                        statusEffect
                    ]
                };
            }

            // No refresh if the replacement is worse
            if (typeExists.duration >= duration) {
                return {
                    statusEffects: target.statusEffects
                }
            }

            return {
                statusEffects: target.statusEffects.map(effect => effect !== typeExists ? effect : statusEffect)
            };
        }
    }
};

const Effect = {
    create(properties) {
        if (!this.EffectType || !this.ValidTypes) {
            throw new Error('All Effect subtypes must define EffectType and ValidTypes');
        }

        if (!ValidEffectTypes.has(this.EffectType)) {
            throw new Error(`Invalid EffectType: ${this.EffectType}`);
        }

        if (!EffectDefinitions[this.EffectType]) {
            throw new Error(`No effect definition entry for type: ${this.EffectType}`);
        }

        const { type } = properties;

        if (!this.ValidTypes.has(type)) {
            throw new Error(`Invalid ${this.EffectType.toLowerCase()} type: ${type}`);
        }

        return Object.create(this).init(properties);
    },

    init(properties = {}) {
        this.properties = properties;
        
        this.applyCondition = EffectDefinitions[this.EffectType].applyCondition;
        this.onApply = EffectDefinitions[this.EffectType].onApply;

        return this;
    },

    apply(user, target) {
        if (this.applyCondition(user, target, this.properties)) {
            return this.onApply(user, target, this.properties);
        }

        return {};
    }
};

const DamageEffect = Object.create(Effect);
DamageEffect.EffectType = EffectTypes.DAMAGE;
DamageEffect.ValidTypes = ValidDamageTypes;

const HealingEffect = Object.create(Effect);
HealingEffect.EffectType = EffectTypes.HEALING;
HealingEffect.ValidTypes = ValidHealingTypes;

const StatusEffect = Object.create(Effect);
StatusEffect.EffectType = EffectTypes.STATUS;
StatusEffect.ValidTypes = ValidStatusTypes;

export { Effect, DamageEffect, HealingEffect, StatusEffect };