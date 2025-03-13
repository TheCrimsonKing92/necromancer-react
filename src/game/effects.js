import { EffectCategories, ValidEffectCategories } from "./constants";
import { calculateDamage, ValidDamageTypes } from "./damage";
import { ValidHealingTypes } from "./healing";
import { StatusDefinitions, ValidStatusTypes } from "./statuses";
import { getHealingStat } from "./stats";

let effectData = null;

const getEffectPrototype = (effectType) => {
    if (!effectData) {
        throw new Error("Effect data not loaded!");
    }

    return effectData.find(effect => effect.type === effectType);
};
const loadEffectsFromJSON = (jsonData) => effectData = jsonData;

const EffectTypes = {
    STAT: "stat",
    RESISTANCE: "resistance",
    SKILL: "skill",
    DAMAGE_MODIFIER: "damage_modifier",
    ELEMENTAL_DAMAGE: "elemental_damage",
    DEFENSE_MODIFIER: "defense_modifier",
    LIFESTEAL: "lifesteal",
    ON_HIT: "on_hit"
};

const EffectScaling = {
    NONE: (baseValue, effectLevel) => baseValue,
    EFFECT_LEVEL: (baseValue, effectLevel) => baseValue * (1 + effectLevel * 0.2)
};

const EffectDefinitions = {
    damage: {
        applyCondition: (user, target) => target.isAlive(),
        onApply: (user, target, { type: damageType, baseDamage, damageSource, calculationType }) => {
            if (!damageSource) {
                throw new Error("Missing damageSource parameter in EffectDefinitions.damage.onApply");
            }

            // (user, target, baseDamage, damageType, calculationType)
            return {
                health: target.health - calculateDamage(user, target, baseDamage, damageType, damageSource, calculationType)
            }
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

            // Add if stackable or no existing instance
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
        if (!this.EffectCategory || !this.ValidTypes) {
            throw new Error('All Effect subtypes must define EffectCategory and ValidTypes');
        }

        if (!ValidEffectCategories.has(this.EffectCategory)) {
            throw new Error(`Invalid EffectCategory: ${this.EffectCategory}`);
        }

        if (!EffectDefinitions[this.EffectCategory]) {
            throw new Error(`No effect definition entry for category: ${this.EffectCategory}`);
        }

        const { type } = properties;

        if (!this.ValidTypes.has(type)) {
            throw new Error(`Invalid ${this.EffectType.toLowerCase()} type: ${type}`);
        }

        return Object.create(this).init(properties);
    },

    init(properties = {}) {
        this.properties = properties;
        
        this.applyCondition = EffectDefinitions[this.EffectCategory].applyCondition;
        this.onApply = EffectDefinitions[this.EffectCategory].onApply;

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
DamageEffect.EffectCategory = EffectCategories.DAMAGE;
DamageEffect.ValidTypes = ValidDamageTypes;

const HealingEffect = Object.create(Effect);
HealingEffect.EffectCategory = EffectCategories.HEALING;
HealingEffect.ValidTypes = ValidHealingTypes;

const StatusEffect = Object.create(Effect);
StatusEffect.EffectCategory = EffectCategories.STATUS;
StatusEffect.ValidTypes = ValidStatusTypes;


function generateStatEnhancement(effect, effectLevel) {
    return {
        type: effect.type,
        stat: effect.stats[Math.floor(Math.random() * effect.stats.length)],
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateStatusResistance(effect, effectLevel) {
    return {
        type: effect.type,
        resistanceType: effect.resistances[Math.floor(Math.random() * effect.resistances.length)],
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateSkillEnhancement(effect, effectLevel) {
    return {
        type: effect.type,
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateEnhancedDamage(effect, effectLevel) {
    return {
        type: effect.type,
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateEnhancedDefense(effect, effectLevel) {
    return {
        type: effect.type,
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateElementalDamage(effect, effectLevel) {
    const minDamage = EffectScaling.EFFECT_LEVEL(effect.baseMin, effectLevel);
    const maxDamage = EffectScaling.EFFECT_LEVEL(effect.baseMax, effectLevel);

    return {
        type: effect.type,
        element: effect.elements[Math.floor(Math.random() * effect.elements.length)],
        minDamage,
        maxDamage
    };
}

function generateLifeSteal(effect, effectLevel) {
    return {
        type: effect.type,
        value: EffectScaling.EFFECT_LEVEL((effect.baseMin + effect.baseMax) / 2, effectLevel)
    };
}

function generateOnHitEffect(effect, effectLevel) {
    return {
        type: effect.type,
        statusEffect: effect.statusEffects[Math.floor(Math.random() * effect.statusEffects.length)],
        chance: EffectScaling.EFFECT_LEVEL((effect.baseChance + effect.maxChance) / 2, effectLevel)
    };
}

function generateEffect(effect, effectLevel) {
    switch (effect.type) {
        case EffectTypes.STAT:
            return generateStatEnhancement(effect, effectLevel);
        case EffectTypes.RESISTANCE:
            return generateStatusResistance(effect, effectLevel);
        case EffectTypes.SKILL:
            return generateSkillEnhancement(effect, effectLevel);
        case EffectTypes.DAMAGE_MODIFIER:
            return generateEnhancedDamage(effect, effectLevel);
        case EffectTypes.ELEMENTAL_DAMAGE:
            return generateElementalDamage(effect, effectLevel);
        case EffectTypes.DEFENSE_MODIFIER:
            return generateEnhancedDefense(effect, effectLevel);
        case EffectTypes.LIFESTEAL:
            return generateLifeSteal(effect, effectLevel);
        case EffectTypes.ON_HIT:
            return generateOnHitEffect(effect, effectLevel);
        default:
            return effect;
    }
}

export {
    EffectScaling, EffectTypes,
    Effect, DamageEffect, HealingEffect, StatusEffect,
    generateEffect,
    getEffectPrototype, loadEffectsFromJSON
};