import { WeaponTypes } from "./weapons";

const EquipmentSlots = {
    AMMO: "ammo",
    HEAD: "head",
    BODY: "body",
    HANDS: "hands",
    LEGS: "legs",
    FEET: "feet",
    LEFT_RING: "leftRing",
    RIGHT_RING: "rightRing",
    NECK: "neck"
};

const LoadoutSlots = {
    MAIN_HAND: "mainHand",
    OFF_HAND: "offHand",
    AMMO: "ammo"
};

const Equipment = {
    formatInvalidSlots: (errorSlots) => `Invalid slots requested for equipment: ${errorSlots.join(", ")}`,
    formatInvalidEquip: (slot) => `Attempted to equip item in invalid equipment slot: ${slot}`,
    formatInvalidUnequip: (slot) => `Attempt to unequip item from invalid equipment slot: ${slot}`,

    validSlots: new Set(Object.values(EquipmentSlots)),

    create() {
        return Object.create(this)
    },

    generateSlots(slotKeys) {
        const equipment = this.create();
        equipment.slots = {};

        const errorSlots = slotKeys.filter(key => !this.validSlots.has(key));
        if (errorSlots.length > 0) {
            throw new Error(this.formatInvalidSlots(errorSlots));
        }

        slotKeys.forEach(key => equipment.slots[key] = null);

        return equipment;
    },

    getItems() {
        return Object.values(this.slots).filter(obj => obj);
    },

    getSlot(slot) {
        return this.slots[slot];
    },

    hasSlot(slot) {
        return this.slots.hasOwnProperty(slot);
    },

    equipItem(slot, item) {
        if (!this.hasSlot(slot)) {
            throw new Error(this.formatInvalidEquip(slot));
        }

        this.slots[slot] = item;
    },

    unequipItem(slot) {
        if (!this.hasSlot(slot)) {
            throw new Error(this.formatInvalidUnequip(slot));
        }

        const unequippedItem = this.slots[slot];
        this.slots[slot] = null;

        return unequippedItem;
    }
};

const isAmmoCompatible = (weapon, ammo) => {
    return (weapon.type === WeaponTypes.BOW && ammo.type === "arrow") || (weapon.type === WeaponTypes.CROSSBOW && ammo.type === "bolt");
};

const LoadoutEquipment = Object.create(Equipment);
LoadoutEquipment.validSlots = new Set(Object.values(LoadoutSlots));
LoadoutEquipment.formatInvalidSlots = (errorSlots) => `Invalid slots requested for loadout: ${errorSlots.join(", ")}`;
LoadoutEquipment.formatInvalidEquip = (slot) => `Attempted to equip item in invalid loadout slot: ${slot}`;
LoadoutEquipment.formatInvalidUnequip = (slot) => `Attempt to unequip item from invalid loadout slot: ${slot}`;

LoadoutEquipment.equipItem = function(slot, item) {
    if (slot === LoadoutSlots.OFF_HAND && this.slots[LoadoutSlots.MAIN_HAND]?.twoHanded) {
        throw new Error("Cannot equip an off-hand item while using a two-handed weapon.");
    }

    if (slot === LoadoutSlots.MAIN_HAND && item.twoHanded && this.slots[LoadoutSlots.OFF_HAND]) {
        throw new Error("Cannot equip a two-handed weapon while an off-hand is already equipped.");
    }

    if (slot === LoadoutSlots.AMMO) {
        const mainHandItem = this.slots[LoadoutSlots.MAIN_HAND];
        if (mainHandItem?.ammo && !isAmmoCompatible(mainHandItem, item)) {
            throw new Error("Incompatible ammo type for equipped weapon");
        }
    }

    Equipment.equipItem.call(this, slot, item);
};

export {
    EquipmentSlots, LoadoutSlots,
    Equipment, LoadoutEquipment
};