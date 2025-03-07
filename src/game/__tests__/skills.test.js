import { describe, expect, test } from '@jest/globals';
import { Character } from '../characters';
import { DamageCalculationTypes, DamageSource, DamageTypes } from '../damage';
import { DamageEffect, StatusEffect } from '../effects';
import { Skill } from '../skills';
import { StatusTypes } from '../statuses';
import { TargetType } from '../targeting';

const bindEntities = (entities) => (id) => entities.find(entity => entity.id === id);

describe('Skill system', () => {
    test('Skill can apply to multiple targets', () => {
        const damageEffect = DamageEffect.create({
            baseDamage: 15,
            type: DamageTypes.NORMAL,
            damageSource: DamageSource.PHYSICAL,
            calculationType: DamageCalculationTypes.FLAT
        });

        const skill = Skill.create({
            name: "Slash",
            description: "A powerful strike",
            effects: [ damageEffect ],
            targetType: TargetType.ENEMY,
            targetCount: 2
        });

        const user = Character.create({
            id: "player1"
        });

        const targets = [
            Character.create({
                id: "enemy1",
                health: 50
            }),
            Character.create({
                id: "enemy2",
                health: 60
            })
        ];

        const entities = [ user, ...targets ];
        const updates = skill.effect(entities, user, targets);

        const { updatedEntities } = updates;
        const getEntity = bindEntities(updatedEntities);

        expect(getEntity('enemy1').health).toBe(35);
        expect(getEntity('enemy2').health).toBe(45);
    });

    test('Skill can apply multiple effects', () => {
        const damageEffect = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.MAGICAL,
            damageSource: DamageSource.MAGICAL,
            calculationType: DamageCalculationTypes.FLAT
        });

        const statusEffect = StatusEffect.create({
            type: StatusTypes.BLEED,
            duration: 5
        });

        const skill = Skill.create({
            name: "Soul Stab",
            description: "Rend an opponent's soul to inflict bleeding",
            effects: [ damageEffect, statusEffect ],
            targetType: TargetType.ENEMY,
            targetCount: 1
        });

        const user = Character.create({
            id: "player1",
            magicPower: 1
        });

        const targets = [
            Character.create({
                id: "bleeder",
                health: 50
            })
        ];

        const entities = [ user, ...targets ];
        const updates = skill.effect(entities, user, targets);

        const { updatedEntities } = updates;
        const getEntity = bindEntities(updatedEntities);

        const bleeder = getEntity('bleeder');
        expect(bleeder.health).toBe(39);
        expect(bleeder.statusEffects).toContainEqual({
            type: StatusTypes.BLEED,
            duration: 5
        });
    });

    test('Skill effects apply in order', () => {
        // Base of 10, power of 1, defense of 3, total of 8
        const flatDamage = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.MAGICAL,
            damageSource: DamageSource.MAGICAL,
            calculationType: DamageCalculationTypes.FLAT
        });

        // Floor of 42 * .1 = 4, power of 1, defense of 3, total of 2
        const targetCurrentHealthPercentDamage = DamageEffect.create({
            baseDamage: 10,
            type: DamageTypes.MAGICAL,
            damageSource: DamageSource.MAGICAL,
            calculationType: DamageCalculationTypes.TARGET_CURRENT_HP_PERCENT
        });

        const skill = Skill.create({
            name: "Lingering Blast",
            effects: [ flatDamage, targetCurrentHealthPercentDamage ],
            targetType: TargetType.ENEMY,
            targetCount: 1
        });

        const user = Character.create({
            id: "doofus",
            magicPower: 1
        });

        const targets = [
            Character.create({
                id: "unlucky",
                health: 50,
                magicDefense: 3
            })
        ];

        const entities = [ user, ...targets ];
        const updates = skill.effect(entities, user, targets);

        const { updatedEntities } = updates;
        const getEntity = bindEntities(updatedEntities);

        expect(getEntity("unlucky").health).toBe(40);
    });
});