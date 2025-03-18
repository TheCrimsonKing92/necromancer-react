import { describe, test, expect, beforeEach } from '@jest/globals';
import { Character } from '../characters';
import { EquipmentSlots, LoadoutSlots } from '../equipment';
import { WeaponTypes } from '../weapons';

describe("Equipment System", () => {
    let character;

    beforeEach(() => {
        character = Character.create({
            id: "player1",
            stats: { attack: 10, defense: 5 }
        });
    });

    test("Equipping an item should place it in the correct slot", () => {
        const sword = { name: "Iron Sword", attack: 5 };

        character.equipItem(LoadoutSlots.MAIN_HAND, sword);
        expect(character.loadout.getSlot(LoadoutSlots.MAIN_HAND)).toEqual(sword);
    });

    test("Unequipping an item should remove it from the slot", () => {
        const sword = { name: "Iron Sword", attack: 5 };

        character.equipItem(LoadoutSlots.MAIN_HAND, sword);
        expect(character.loadout.getSlot(LoadoutSlots.MAIN_HAND)).toEqual(sword);
        const removed = character.unequipItem(LoadoutSlots.MAIN_HAND);
        expect(removed).toEqual(sword);
        expect(character.loadout.getSlot(LoadoutSlots.MAIN_HAND)).toBeNull();
    });

    test("Equipping armor should update defense stat", () => {
        const armor = { name: "Steel Chestplate", defense: 10 };

        character.equipItem(EquipmentSlots.BODY, armor);
        expect(character.getStat('defense')).toBe(15);
    });

    test("Equipping an accessory should apply its bonus", () => {
        const ring = { name: "Ring of Strength", strength: 3 };

        character.equipItem(EquipmentSlots.LEFT_RING, ring);
        expect(character.getStat('strength')).toBe(3);
    });

    test("Equipping incompatible items should throw an error", () => {
        const helmet = { name: "Knight's Helm", defense: 5 };

        expect(() => character.equipItem("INVALID_SLOT", helmet)).toThrow("Invalid slot: INVALID_SLOT");
    });

    test("Swapping loadouts should retain equipment state", () => {
        const sword = { name: "Iron Sword", attack: 5 };
        const bow = { name: "Longbow", attack: 4, requiresAmmo: true };

        character.equipItem(LoadoutSlots.MAIN_HAND, sword);
        character.swapLoadout();
        character.equipItem(LoadoutSlots.MAIN_HAND, bow);

        expect(character.loadout.getSlot(LoadoutSlots.MAIN_HAND)).toEqual(bow);

        character.swapLoadout();
        expect(character.loadout.getSlot(LoadoutSlots.MAIN_HAND)).toEqual(sword);
    });

    test("Equipping two-handed weapons prevents an off-hand item", () => {
        const greatsword = { name: "Greatsword", twoHanded: true, attack: 8 };
        const shield = { name: "Tower Shield", defense: 6 };

        character.equipItem(LoadoutSlots.MAIN_HAND, greatsword);
        expect(() => character.equipItem(LoadoutSlots.OFF_HAND, shield)).toThrow(
            "Cannot equip an off-hand item while using a two-handed weapon."
        );
    });

    test("Swapping loadouts does not affect non-loadout equipment", () => {
        const chestplate = { name: "Knight’s Chestplate", defense: 8 };

        character.equipItem(EquipmentSlots.BODY, chestplate);
        character.swapLoadout();
        expect(character.equipment.getSlot(EquipmentSlots.BODY)).toEqual(chestplate);
    });

    test("Ammo slot only allows compatible ammo", () => {
        const arrows = { name: "Arrows", type: "arrow" };
        const bolts = { name: "Bolts", type: "bolt" };
        const bow = { name: "Shortbow", type: WeaponTypes.BOW, ammo: "arrow" };
        const crossbow = { name: "Light Crossbow", type: WeaponTypes.CROSSBOW, ammo: "bolt" };

        character.equipItem(LoadoutSlots.MAIN_HAND, bow);
        expect(() => character.equipItem(LoadoutSlots.AMMO, arrows)).not.toThrow(); // check no error
        expect(character.loadout.getSlot(LoadoutSlots.AMMO)).toEqual(arrows);

        expect(() => character.equipItem(LoadoutSlots.AMMO, bolts)).toThrow("Incompatible ammo type for equipped weapon");

        character.swapLoadout();

        character.equipItem(LoadoutSlots.MAIN_HAND, crossbow);
        expect(() => character.equipItem(LoadoutSlots.AMMO, bolts)).not.toThrow();
        expect(character.loadout.getSlot(LoadoutSlots.AMMO)).toEqual(bolts);

        expect(() => character.equipItem(LoadoutSlots.AMMO, arrows)).toThrow("Incompatible ammo type for equipped weapon");
    });
});
