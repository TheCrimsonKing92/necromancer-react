import { describe, expect, test } from '@jest/globals';
import { Skill } from '../skills';
import { DamageEffect } from '../effects';
import { TargetSelection, TargetType } from '../targeting';
import { Character } from '../characters';

describe('Skill system', () => {
    test('Skill.effect applies damage to multiple targets', () => {
        const damageEffect = Object.create(DamageEffect).init({
            baseDamage: 15,
            damageType: "physical"
        });
        const skill = Object.create(Skill).init(
            "Slash",
            "A powerful strike",
            [ damageEffect ],
            TargetType.ENEMY,
            1,
            TargetSelection.CHOICE
        );

        const user = Object.create(Character).init({
            id: "player1"
        });

        const targets = [
            Object.create(Character).init({
                id: "enemy1",
                health: 50
            }),
            Object.create(Character).init({
                id: "enemy2",
                health: 60
            })
        ];

        const entities = [ user, ...targets ];
        const updates = skill.effect(entities, user, targets);

        const { updatedEntities } = updates;
        const getEntity = (id) => updatedEntities.find(entity => entity.id === id);

        expect(getEntity('enemy1').health).toBe(35);
        expect(getEntity('enemy2').health).toBe(45);
    });
});