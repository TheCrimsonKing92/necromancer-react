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

    magical_damage: {
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
            const { attack } = user;
            const totalDamage = attack + baseDamage;
            const { defense } = target;
            const damage = Math.max(totalDamage - defense, 1);

            return {
                health: target.health - damage
            };
        }
    },

    status: {
        // Not a good condition if you want to allow refreshing the status
        applyCondition: (user, target, { statusType, duration }) => !target.hasStatus(statusType),
        onApply: (user, target, { statusType, duration }) => {
            const statusEffect = { statusType, duration };

            // Naive refresh, will require more elaboration later
            const existing  = target.statusEffects.find(effect => effect.type === statusType);

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
        if (this.applyCondition(user, target, this.properties)) {
            return this.onApply(user, target, this.properties);
        }

        return {};
    }
};

const DamageEffect = Object.create(Effect);
DamageEffect.init = function({ baseDamage, damageType = DamageTypes.PHYSICAL }) {
    if (!Object.values(DamageTypes).includes(damageType)) {
        throw new Error(`Invalid damage type: ${damageType}`);
    }

    return Effect.init.call(this, `${damageType}_damage`, { baseDamage });
};
DamageEffect.create = function(properties) {
    return Object.create(this).init(properties);
};

const HealingEffect = Object.create(Effect);
HealingEffect.init = function({ baseHealing, healingType = HealingTypes.PHYSICAL}) {
    if (!Object.values(HealingTypes).includes(healingType)) {
        throw new Error(`Invalid healing type: ${healingType}`);
    }

    return Effect.init.call(this, "healing", { baseHealing, healingType })
};
HealingEffect.create = function(properties) {
    return Object.create(this).init(properties);
};

const StatusEffect = Object.create(Effect);
StatusEffect.init = function({ statusType, duration }) {
    if (!Object.values(StatusTypes).includes(statusType)) {
        throw new Error(`Invalid status type: ${statusType}`);
    }

    return Effect.init.call(this, "status", { statusType, duration });
};
StatusEffect.create = function(properties) {
    return Object.create(this).init(properties);
};

export { Effect, DamageEffect, HealingEffect, StatusEffect };