import { DamageTypes } from "./constants";
import { HealingTypes } from "./constants";
import { StatusTypes } from "./constants";
import { getHealingStat } from "./stats";

const EffectDefinitions = {
    healing: {
        applyCondition: (user, target) => target.isAlive() && target.health < target.maxHealth,
        onApply: (user, target, { baseHealing, healingType }) => {
            const healingStat = getHealingStat(healingType);
            const userHealing = user[healingStat] || 0;
            const totalHealing = userHealing + baseHealing;
            const healing = Math.min(totalHealing, target.maxHealth - target.health);
            const health = target.health + healing;

            return { health };
        }
    },

    magic_damage: {
        applyCondition: (user, target) => target.isAlive(),
        onApply: (user, target, { baseDamage }) => {
            const totalDamage = user.magicPower + baseDamage;
            const damage = Math.max(totalDamage - target.magicDefense, 1);
            const health = target.health - damage;

            return { health };
        }
    },

    physical_damage: {
        applyCondition: (user, target) => target.isAlive(),
        onApply: (user, target, { baseDamage }) => {
            const totalDamage = user.attack + baseDamage;
            const damage = Math.max(totalDamage - target.defense, 1);
            const health = target.health - damage;

            return { health };
        }
    },

    status: {
        // Not a good condition if you want to allow refreshing the status
        applyCondition: (user, target, { statusEffect }) => !target.hasStatus(statusEffect.type),
        onApply: (user, target, { statusEffect }) => {
            // Naive refresh, will require more elaboration later
            const existing  = target.statusEffects.find(effect => effect.type === statusEffect.type);

            if (existing) {
                return target.statusEffects.map((effect) => existing === effect ? statusEffect : effect);
            }

            return {
                statusEffects: [ ...target.statusEffects, statusEffect ]
            };
        }
    }
};

const Effect = {
    init(type, properties = {}) {
        if (!EffectDefinitions[type]) {
            throw new Error(`Unknown effect type: ${type}`);
        }

        this.type = type;
        this.properties = properties;
        
        this.applyCondition = EffectDefinitions[type].applyCondition;
        this.onApply = EffectDefinitions[type].onApply;

        return this;
    },

    apply(user, target) {
        return this.applyCondition(user, target) ? this.onApply(user, target, this.properties) : {};
    }
};

const DamageEffect = Object.create(Effect);
DamageEffect.init = function({ baseDamage, damageType = DamageTypes.PHYSICAL }) {
    if (!Object.values(DamageTypes).includes(damageType)) {
        throw new Error(`Invalid damage type: ${damageType}`);
    }

    return Effect.init.call(this, `${damageType}_damage`, { baseDamage });
};

const HealingEffect = Object.create(Effect);
HealingEffect.init = function({ baseHealing, healingType = HealingTypes.PHYSICAL}) {
    if (!Object.values(HealingTypes).includes(healingType)) {
        throw new Error(`Invalid healing type: ${healingType}`);
    }

    return Effect.init.call(this, "healing", { baseHealing, healingType })
};

const StatusEffect = Object.create(Effect);
StatusEffect.init = function({ statusType, duration }) {
    if (!Object.values(StatusTypes).includes(statusType)) {
        throw new Error(`Invalid status type: ${statusType}`);
    }

    return Effect.init.call(this, "status", { statusType, duration });
};

export { Effect, DamageEffect, HealingEffect, StatusEffect };