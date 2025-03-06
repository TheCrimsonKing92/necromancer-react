import { describe, test, expect } from '@jest/globals';
import { DamageEffect, HealingEffect, StatusEffect } from "../effects";
import { Character } from '../characters';
import { DamageCalculationTypes, DamageTypes } from '../damage';
import { HealingTypes } from '../healing';
import { StatusTypes } from '../statuses';

describe('Effect system', () => {
    test('Damage effect reduces target health', () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.PHYSICAL,
            calculationType: DamageCalculationTypes.FLAT
        });
        
        const target = Character.create({
            id: "enemy1",
            health: 50
        });

        const result = effect.apply(Character.create(), target);
        expect(result.health).toBe(40);
    });

    test('Physical damage effect uses attack and defense', () => {
        const effect = DamageEffect.create({
            baseDamage: 20,
            type: DamageTypes.PHYSICAL,
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

    test("We can calculate damage based on the target's current health", () => {
        const effect = DamageEffect.create({
            baseDamage: 50,
            type: DamageTypes.PHYSICAL,
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

    test("We can calculate damage based on the target's max health", () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.PHYSICAL,
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

    test("We can calculate damage based on the user's max health", () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.PHYSICAL,
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