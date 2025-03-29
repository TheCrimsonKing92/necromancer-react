import { describe, expect, test, jest } from '@jest/globals';
import { EquipmentSlots, LoadoutSlots } from '../equipment';
import {
  BaseItem,
  EquippableItem,
  Weapon,
  Armor,
  Accessory,
  Consumable
} from '../items';

describe("EquippableItem allowedSlots", () => {
  test("falls back to EquippableItem.defaultSlots when not provided", () => {
    const dummy = Object.create(EquippableItem);
    dummy.init({ name: "Dummy Item" });
    expect(dummy.allowedSlots).toEqual(EquippableItem.defaultSlots);
  });

  test("uses provided valid allowedSlots", () => {
    const headgear = Object.create(EquippableItem);
    headgear.init({ name: "Headgear", allowedSlots: [ EquipmentSlots.HEAD ] });
    expect(headgear.allowedSlots).toEqual([ EquipmentSlots.HEAD ]);
  });

  test("throws error for invalid allowedSlots", () => {
    expect(() => {
      const badItem = Object.create(EquippableItem);
      badItem.init({
        name: "Bad Item",
        allowedSlots: [ "invalidSlot", "anotherBadSlot", EquipmentSlots.BODY ]
      });
    }).toThrow("Invalid allowed slots: invalidSlot, anotherBadSlot");
  });
});

describe("EquippableItem allowedSlots immutability", () => {
  test("modifying one instance's allowedSlots does not affect defaultSlots or others", () => {
    const ring1 = Object.create(Accessory);
    ring1.init({ name: "Ring 1" });

    const ring2 = Object.create(Accessory);
    ring2.init({ name: "Ring 2" });

    // Mutate one instance
    ring1.allowedSlots.push("corrupted_slot");

    // Sanity check: mutation happened on ring1
    expect(ring1.allowedSlots).toContain("corrupted_slot");

    // But ring2 remains untouched
    expect(ring2.allowedSlots).not.toContain("corrupted_slot");

    // And defaultSlots remains clean
    expect(Accessory.defaultSlots).not.toContain("corrupted_slot");
  });
});

describe("Weapon allowedSlots", () => {
  test("falls back to Weapon.defaultSlots when props.allowedSlots is missing", () => {
    const sword = Object.create(Weapon);
    sword.init({ name: "Sword", weaponType: "sword", baseDamage: 10 });

    expect(sword.allowedSlots).toEqual(Weapon.defaultSlots);
    expect(sword.allowedSlots).toEqual([ LoadoutSlots.MAIN_HAND, LoadoutSlots.OFF_HAND ]);
  });

  test("still honors explicitly provided allowedSlots", () => {
    const wand = Object.create(Weapon);
    wand.init({
      name: "Wand",
      weaponType: "wand",
      baseDamage: 6,
      allowedSlots: [ LoadoutSlots.OFF_HAND ]
    });
    
    expect(wand.allowedSlots).toEqual([ LoadoutSlots.OFF_HAND ]);
  });
});

describe("Armor defaultSlots", () => {
  test("uses Armor.defaultSlots if none provided", () => {
    const chestplate = Object.create(Armor);
    chestplate.init({ name: "Chestplate" });
    expect(chestplate.allowedSlots).toEqual(Armor.defaultSlots);
    expect(chestplate.allowedSlots).toEqual([ EquipmentSlots.BODY ]);
  });
});

describe("Accessory defaultSlots", () => {
  test("uses Accessory.defaultSlots if none provided", () => {
    const ring = Object.create(Accessory);
    ring.init({ name: "Ring of Strength" });
    expect(ring.allowedSlots).toEqual(Accessory.defaultSlots);
    expect(ring.allowedSlots).toEqual([ EquipmentSlots.LEFT_RING, EquipmentSlots.RIGHT_RING ]);
  });
});

describe("Consumable items", () => {
  test("decrements uses on use", () => {
    const potion = Object.create(Consumable);
    const onUseMock = jest.fn();
    potion.init({
      name: "Health Potion",
      uses: 3,
      onUse: onUseMock
    });
    
    potion.use({}, []);
    expect(potion.uses).toBe(2);
    expect(onUseMock).toHaveBeenCalled();
  });
});