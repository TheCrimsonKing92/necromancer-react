import { describe, test, expect, beforeEach } from "@jest/globals";
import { Character } from "../characters";
import { Inventory } from "../inventory";

describe("Inventory System", () => {
  let character;

  beforeEach(() => {
    character = Character.create({
      id: "test_character",
      name: "Test Character",
      strength: 10  
    });
  });

  test("Adding an item within capacity should succeed", () => {
    const sword = { name: "Iron Sword", weight: 5 };
    
    character.inventory.addItem(sword);

    expect(character.inventory.getCurrentWeight()).toBe(5);
    
    const foundItems = character.inventory.findItems(it => it.name === "Iron Sword");
    expect(foundItems.length).toBe(1);
    expect(foundItems[0]).toBe(sword);
  });

  test("Cannot add item that exceeds capacity", () => {
    const heavyArmor = { name: "Heavy Armor", weight: 999 };

    expect(() => character.inventory.addItem(heavyArmor))
      .toThrow("Not enough inventory capacity to add item");
  });

  test("Removing an item works correctly", () => {
    const potion = { name: "Healing Potion", weight: 1 };
    character.inventory.addItem(potion);
    expect(character.inventory.getCurrentWeight()).toBe(1);

    const removed = character.inventory.removeItem(potion);
    expect(removed).toBe(potion);
    expect(character.inventory.getCurrentWeight()).toBe(0);
    expect(character.inventory.findItems(it => it.name === "Healing Potion").length).toBe(0);
  });

  test("Trying to remove an item not in inventory returns throws an error", () => {
    const ring = { name: "Ring of Luck", weight: 0.1 };
    expect(() => character.inventory.removeItem(ring)).toThrow("No such item in inventory");
  });

  test("We can find items by name or by weight", () => {
    const bow = { name: "Longbow", weight: 2 };
    const arrows = { name: "Arrows", weight: 0.5 };

    character.inventory.addItem(bow);
    character.inventory.addItem(arrows);

    expect(character.inventory.findItems(it => [ bow.name, arrows.name ].includes(it.name)).length).toBe(2);

    const heavyItems = character.inventory.findItems(it => it.weight > 1);
    expect(heavyItems).toContain(bow);
    expect(heavyItems).not.toContain(arrows);
  });

  test("Capacity can increase if character's stats change", () => {
    const smallItem = { name: "Dagger", weight: 35 };
    const bigItem   = { name: "Greatshield", weight: 36 };

    character.inventory.addItem(smallItem);
    expect(() => character.inventory.addItem(bigItem)).toThrow("Not enough inventory capacity");

    character.strength = 20;

    expect(() => character.inventory.addItem(bigItem)).not.toThrow();
    expect(character.inventory.getCurrentWeight()).toBe(71);
  });
});
