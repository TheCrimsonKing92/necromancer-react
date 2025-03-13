import { describe, test, expect, beforeAll } from '@jest/globals';
import { expectHasNoProperties } from '../../utils/testUtils';
import {
    EffectScaling, EffectTypes,
    DamageEffect, HealingEffect, StatusEffect,
    generateEffect, getEffectPrototype, loadEffectsFromJSON
} from "../effects";
import { Character } from '../characters';
import { DamageCalculationTypes, DamageSource, DamageTypes } from '../damage';
import { HealingTypes } from '../healing';
import { StatusTypes } from '../statuses';

beforeAll(() => {
    const mockEffectData = [
        { type: "stat", stats: ["strength", "dexterity", "intelligence"], baseMin: 5, baseMax: 10 },
        { type: "resistance", resistances: ["fire", "cold", "lightning", "poison"], baseMin: 3, baseMax: 7 },
        { type: "skill", baseMin: 1, baseMax: 3 },
        { type: "damage_modifier", baseMin: 10, baseMax: 20 },
        { type: "defense_modifier", baseMin: 5, baseMax: 15 },
        { type: "lifesteal", baseMin: 2, baseMax: 6 },
        { type: "on_hit", statusEffects: ["burn", "freeze", "stun"], baseChance: 10, maxChance: 30 }
    ];

    loadEffectsFromJSON(mockEffectData);
});

describe('Effect system', () => {
    test('Damage effect reduces target health', () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.FLAT
        });
        
        const target = Character.create({
            id: "enemy1",
            health: 50,
            defense: 0
        });

        const result = effect.apply(Character.create({ attack: 0 }), target);
        expect(result.health).toBe(40);
    });

    test('Physical damage effect uses attack and defense', () => {
        const effect = DamageEffect.create({
            baseDamage: 20,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.FLAT
        });

        const target = Character.create({
            id: "enemy1",
            health: 100,
            defense: 5
        });

        const result = effect.apply(
            Character.create({ attack: 10 }),
            target
        );
        expect(result.health).toBe(75);
    });

    test("Damage is never reduced below 1 by high defense values", () => {
        const effect = DamageEffect.create({
            baseDamage: 20,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.FLAT
        });
    
        const target = Character.create({
            id: "enemy",
            health: 100,
            defense: 9999
        });
    
        const result = effect.apply(
            Character.create({ attack: 10 }),
            target
        );
    
        expect(result.health).toBe(99);
    });

    test("We can calculate damage based on the target's current health", () => {
        const effect = DamageEffect.create({
            baseDamage: 50,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.TARGET_CURRENT_HP_PERCENT
        });

        const target = Character.create({
            id: "enemy",
            health: 100,
            defense: 5
        });

        const result = effect.apply(
            Character.create({ attack: 5 }),
            target
        );
        expect(result.health).toBe(50);
    });

    test("Percentage-based damage always deals at least 1 damage", () => {
        const effect = DamageEffect.create({
            baseDamage: 1,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.TARGET_CURRENT_HP_PERCENT
        });
    
        const target = Character.create({
            id: "enemy",
            health: 5,
            defense: 3
        });
    
        const result = effect.apply(
            Character.create({ attack: 1 }), 
            target
        );
        expect(result.health).toBe(4);
    });

    test("We can calculate damage based on the target's max health", () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.TARGET_MAX_HP_PERCENT
        });

        const target = Character.create({
            id: "enemy",
            health: 50,
            maxHealth: 100,
            defense: 5
        });

        const result = effect.apply(
            Character.create({ attack: 1 }),
            target
        );
        expect(result.health).toBe(44);
    });

    test("Damage calculation remains precise for high max health values", () => {
        const effect = DamageEffect.create({
            baseDamage: 1,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.TARGET_MAX_HP_PERCENT
        });
    
        const target = Character.create({
            id: "boss",
            health: 1000000,
            maxHealth: 1000000,
            defense: 100
        });
    
        const result = effect.apply(
            Character.create({ attack: 50 }),
            target
        );
        expect(result.health).toBe(990050);
    });

    test("We can calculate damage based on the user's max health", () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.USER_MAX_HP_PERCENT
        });

        const target = Character.create({
            id: "enemy",
            health: 100,
            defense: 2
        });

        const result = effect.apply(
            Character.create({ attack: 1, maxHealth: 1000 }),
            target
        );
        expect(result.health).toBe(1);
    });

    test('Magical damage effect uses magic power and magic defense', () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.MAGICAL,
            damageSource: DamageSource.MAGICAL,
            calculationType: DamageCalculationTypes.FLAT
        });
        const target = Character.create({
            id: "enemy",
            health: 90,
            magicDefense: 1
        });

        const result = effect.apply(
            Character.create({
                magicPower: 2
            }),
            target
        );
        expect(result.health).toBe(79);
    });

    test('Healing effect restores health', () => {
        const effect = HealingEffect.create({
            baseHealing: 20,
            type: HealingTypes.MAGIC
        });

        const target = Character.create({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(Character.create(), target);
        expect(result.health).toBe(30);
    });

    test('Magic power stat enhances magic healing type', () => {
        const effect = HealingEffect.create({
            baseHealing: 20,
            type: HealingTypes.MAGIC
        });

        const target = Character.create({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(
            Character.create({
                magicPower: 10
            }),
            target
        );
        expect(result.health).toBe(40);
    });

    test('Medicine stat enhances medicine healing type', () => {
        const effect = HealingEffect.create({
            baseHealing: 10,
            type: HealingTypes.MEDICINE
        });

        const user = Character.create({
            medicine: 5
        });
        const target = Character.create({
            id: "friendly",
            health: 15,
            maxHealth: 50
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(30);
    });

    test('Healing effect does not exceed max health', () => {
        const effect = HealingEffect.create({
            baseHealing: 20,
            type: HealingTypes.MAGIC
        });

        const user = Character.create({
            magicPower: 9999
        });
        const target = Character.create({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(50);
    });

    test('StatusEffect applies a status condition', () => {
        const burnProps = {
            type: StatusTypes.BURN,
            duration: 2
        };

        const target = Character.create({
            id: 'enemy1'
        });

        const result = StatusEffect.create(burnProps).apply({}, target);

        expect(result.statusEffects).toContainEqual(burnProps);
    });

    test('Stackable statuses should be applied multiple times', () => {
        const firstBleed = {
            type: StatusTypes.BLEED,
            duration: 2
        };

        const secondBleed = {
            type: StatusTypes.BLEED,
            duration: 4
        };

        const target = Character.create({
            id: "enemy",
            statusEffects: [ firstBleed ]
        });

        const result = StatusEffect.create(secondBleed).apply({}, target);

        expect(result.statusEffects.length).toBe(2);
        expect(result.statusEffects).toContainEqual(firstBleed);
        expect(result.statusEffects).toContainEqual(secondBleed);
    });

    test('Different status effects do not replace each other', () => {
        const burnProps = {
            type: StatusTypes.BURN,
            duration: 4
        };
        const bleedProps = {
            type: StatusTypes.BLEED,
            duration: 6
        };

        const target = Character.create({
            id: 'enemy',
            statusEffects: [ burnProps ]
        });

        const result = StatusEffect.create(bleedProps).apply({}, target);

        expect(result.statusEffects).toContainEqual(burnProps);
        expect(result.statusEffects).toContainEqual(bleedProps);
    });
});

describe('Effect generation', () => {
    
    test('Generated stat enhancement should have a single stat and value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.STAT);
        const effectLevel = 3;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.STAT);
        expect(generated).toHaveProperty('stat');
        expect(effectPrototype.stats).toContain(generated.stat);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'stats', 'baseMin', 'baseMax' ]);
    });

    test('Generated status resistance should contain a single resistance type and value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.RESISTANCE);
        const effectLevel = 2;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.RESISTANCE);
        expect(generated).toHaveProperty('resistanceType');
        expect(effectPrototype.resistances).toContain(generated.resistanceType);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'resistances', 'baseMin', 'baseMax' ]);
    });

    test('Generated skill enhancement should contain only value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.SKILL);
        const effectLevel = 5;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.SKILL);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'baseMin', 'baseMax' ]);
    });

    test('Generated enhanced damage should contain only value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.DAMAGE_MODIFIER);
        const effectLevel = 4;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.DAMAGE_MODIFIER);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'baseMin', 'baseMax' ]);
    });

    test('Generated enhanced defense should contain only value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.DEFENSE_MODIFIER);
        const effectLevel = 3;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.DEFENSE_MODIFIER);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'baseMin', 'baseMax' ]);
    });

    test('Generated lifesteal should contain only value', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.LIFESTEAL);
        const effectLevel = 2;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.LIFESTEAL);
        expect(generated).toHaveProperty('value');
        expect(generated.value).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseMin + effectPrototype.baseMax) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'baseMin', 'baseMax' ]);
    });

    test('Generated on-hit effect should contain only a status effect and chance', () => {
        const effectPrototype = getEffectPrototype(EffectTypes.ON_HIT);
        const effectLevel = 4;
        const generated = generateEffect(effectPrototype, effectLevel);

        expect(generated).toHaveProperty('type', EffectTypes.ON_HIT);
        expect(generated).toHaveProperty('statusEffect');
        expect(effectPrototype.statusEffects).toContain(generated.statusEffect);
        expect(generated).toHaveProperty('chance');
        expect(generated.chance).toBe(EffectScaling.EFFECT_LEVEL((effectPrototype.baseChance + effectPrototype.maxChance) / 2, effectLevel));

        expectHasNoProperties(generated, [ 'statusEffects', 'baseChance', 'maxChance' ]);
    });

});