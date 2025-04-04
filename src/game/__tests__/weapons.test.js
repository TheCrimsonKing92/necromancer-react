import { describe, test, expect } from '@jest/globals';
import { RarityData } from '../constants';
import { LoadoutSlots } from '../equipment';
import { generateWeapon } from '../item-generation';
import { Weapon } from '../items';
import { MaterialTypes } from '../materials';
import { WeaponTypes } from '../weapons';

describe('Weapon Generation', () => {
  test('generateWeapon returns a weapon object with required properties', () => {
    const weapon = generateWeapon({
      weaponType: WeaponTypes.SWORD,
      materialName: MaterialTypes.IRON
    });
    expect(weapon).toHaveProperty('weaponType', WeaponTypes.SWORD);
    expect(weapon).toHaveProperty('material', MaterialTypes.IRON);
    expect(weapon).toHaveProperty('name');
    expect(weapon).toHaveProperty('baseDamage');
    expect(weapon).toHaveProperty('critChance');
    expect(weapon).toHaveProperty('rarity', "Uncommon");
  });

  test('generated weapon baseDamage is within the scaled material range', () => {
    // For Iron, materialData.weapon.baseDamageRange: [5, 7]
    // And for rarity "uncommon" (from RarityData.UNCOMMON): baseMultiplier: 1.1
    const rarityData = RarityData.UNCOMMON; // e.g., { name: "Uncommon", baseMultiplier: 1.1, magicCount: 1 }
    const minExpected = Math.floor(5 * rarityData.baseMultiplier);
    const maxExpected = Math.floor(7 * rarityData.baseMultiplier);
    const weapon = generateWeapon({
      weaponType: WeaponTypes.SWORD,
      materialName: MaterialTypes.IRON,
      rarity: "uncommon"
    });
    expect(weapon.baseDamage).toBeGreaterThanOrEqual(minExpected);
    expect(weapon.baseDamage).toBeLessThanOrEqual(maxExpected);
  });

  test('generateWeapon picks a material from the allowed pool if none is specified', () => {
    // For daggers, the allowed pool includes several materials.
    const weapon = generateWeapon({ weaponType: WeaponTypes.DAGGER, rarity: "common" });
    const allowedMaterials = [
      MaterialTypes.WROUGHT_IRON,
      MaterialTypes.BONE,
      MaterialTypes.BRONZE,
      MaterialTypes.IRON,
      MaterialTypes.STEEL,
      MaterialTypes.MITHRIL,
      MaterialTypes.STARSTEEL,
      MaterialTypes.ADAMANTINE
    ];
    expect(allowedMaterials).toContain(weapon.material);
  });

  test('weapon name defaults to "<material> <WeaponType>" if not provided', () => {
    const weapon = generateWeapon({
      weaponType: WeaponTypes.SPEAR,
      materialName: MaterialTypes.STEEL,
      rarity: "uncommon"
    });
    const expectedName = `${MaterialTypes.STEEL} ${WeaponTypes.SPEAR.charAt(0).toUpperCase() + WeaponTypes.SPEAR.slice(1)}`;
    expect(weapon.name).toBe(expectedName);
  });

  test('generateWeapon adds magicalEffects based on rarity magicCount', () => {
    // For legendary rarity, magicCount should be 4 (per our RarityData)
    const weapon = generateWeapon({
      weaponType: WeaponTypes.SWORD,
      materialName: MaterialTypes.ADAMANTINE,
      rarity: "legendary"
    });
    // We expect a "magicalEffects" property, with length not exceeding the magicCount.
    expect(weapon).toHaveProperty('magicalEffects');
    const legendaryMagicCount = RarityData.LEGENDARY.magicCount;
    expect(weapon.magicalEffects.length).toBeLessThanOrEqual(legendaryMagicCount);
  });

  describe("Weapon Prototype", () => {
    test("creates a weapon with provided properties", () => {
      const props = {
        name: "Test Sword",
        weaponType: WeaponTypes.SWORD,
        baseDamage: 10,
        twoHanded: false,
        allowedSlots: [LoadoutSlots.MAIN_HAND, LoadoutSlots.OFF_HAND],
      };
  
      // Using the inherited create method
      const weaponInstance = Weapon.create(props);
  
      expect(weaponInstance.name).toBe("Test Sword");
      expect(weaponInstance.weaponType).toBe("sword");
      expect(weaponInstance.baseDamage).toBe(10);
      expect(weaponInstance.twoHanded).toBe(false);
      expect(weaponInstance.allowedSlots).toEqual([LoadoutSlots.MAIN_HAND, LoadoutSlots.OFF_HAND]);
    });
  
    test("defaults twoHanded to false when not provided", () => {
      const props = {
        name: "Light Dagger",
        weaponType: "dagger",
        baseDamage: 5,
      };
  
      const weaponInstance = Weapon.create(props);
      expect(weaponInstance.twoHanded).toBe(false);
    });
  
    test("uses Weapon.defaultSlots when allowedSlots is not provided", () => {
      const props = {
        name: "Test Spear",
        weaponType: "spear",
        baseDamage: 8,
        twoHanded: true,
      };
  
      const weaponInstance = Weapon.create(props);
      // If allowedSlots is not provided, it should fall back to Weapon.defaultSlots.
      expect(weaponInstance.allowedSlots).toEqual(Weapon.defaultSlots);
    });
  });
});
