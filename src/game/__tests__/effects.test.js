import { describe, test, expect } from '@jest/globals';
import { DamageEffect, HealingEffect, StatusEffect } from "../effects";
import { Character } from '../characters';
import { HealingTypes } from '../constants';

describe('Effect system', () => {
    test('DamageEffect correctly reduces target health', () => {
        const effect = Object.create(DamageEffect).init({
            baseDamage: 10,
            damageType: "physical"
        });

        const user = {
            attack: 0
        };

        const target = Object.create(Character).init({
            id: "enemy1",
            health: 50,
            defense: 0
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(40);
    });

    test('DamageEffect correctly uses attack and defense', () => {
        const effect = Object.create(DamageEffect).init({
            baseDamage: 20,
            damageType: "physical"
        });

        const user = {
            attack: 10
        };

        const target = Object.create(Character).init({
            id: "enemy1",
            health: 100,
            defense: 5
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(75);
    });

    test('HealingEffect restores health without exceeding max health', () => {
        const effect = Object.create(HealingEffect).init({
            baseHealing: 20,
            healingType: HealingTypes.MAGIC
        });

        const user = {
            magicPower: 0
        };

        const target = Object.create(Character).init({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(user, target);

        expect(result.health).toBe(30);
    });

    test('HealingTypes.Magic enhances healing with magic power', () => {
        const effect = Object.create(HealingEffect).init({
            baseHealing: 20,
            healingType: HealingTypes.MAGIC
        });

        const user = {
            magicPower: 10
        };

        const target = Object.create(Character).init({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(user, target);

        expect(result.health).toBe(40);
    });

    test('StatusEffect applies a status condition', () => {
        const effect = Object.create(StatusEffect).init({
            statusType: 'burn',
            duration: 2
        });

        const target = Object.create(Character).init({
            id: 'enemy1',
            statusEffects: []
        });

        const result = effect.apply({}, target);

        expect(result.statusEffects).toContainEqual({
            statusType: 'burn',
            duration: 2
        });
    });
});