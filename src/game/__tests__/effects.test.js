import { describe, test, expect } from '@jest/globals';
import { DamageEffect, HealingEffect, StatusEffect } from "../effects";
import { Character } from '../characters';
import { DamageTypes, HealingTypes, StatusTypes } from '../constants';

describe('Effect system', () => {
    test('Damage effect correctly reduces target health', () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            damageType: DamageTypes.PHYSICAL
        });

        const user = Character.create();
        const target = Character.create({
            id: "enemy1",
            health: 50
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(40);
    });

    test('Physical damage effect correctly uses attack and defense', () => {
        const effect = DamageEffect.create({
            baseDamage: 20,
            damageType: DamageTypes.PHYSICAL
        });

        const user = Character.create({
            attack: 10
        });
        const target = Character.create({
            id: "enemy1",
            health: 100,
            defense: 5
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(75);
    });

    test('Magical damage effect correctly uses magic power and magic defense', () => {
        const effect = DamageEffect.create({
            baseDamage: 10,
            damageType: DamageTypes.MAGICAL
        });

        const user = Character.create({
            magicPower: 2
        });
        const target = Character.create({
            id: "enemy",
            health: 90,
            magicDefense: 1
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(79);
    });

    test('Healing effect restores health without exceeding max health', () => {
        const effect = HealingEffect.create({
            baseHealing: 20,
            healingType: HealingTypes.MAGIC
        });

        const user = Character.create({
            magicPower: 0
        });
        const target = Character.create({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(30);
    });

    test('Magic healing type enhances healing with magic power', () => {
        const effect = HealingEffect.create({
            baseHealing: 20,
            healingType: HealingTypes.MAGIC
        });

        const user = Character.create({
            magicPower: 10
        });
        const target = Character.create({
            id: "ally1",
            health: 10,
            maxHealth: 50
        });

        const result = effect.apply(user, target);
        expect(result.health).toBe(40);
    });

    test('StatusEffect applies a status condition', () => {
        const effect = StatusEffect.create({
            statusType: StatusTypes.BURN,
            duration: 2
        });

        const target = Character.create({
            id: 'enemy1',
            statusEffects: []
        });

        const result = effect.apply({}, target);
        expect(result.statusEffects).toContainEqual({
            statusType: StatusTypes.BURN,
            duration: 2
        });
    });
});