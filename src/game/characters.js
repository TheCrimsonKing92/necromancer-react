import { EquipmentSlots, LoadoutSlots } from './equipment';
import { WeaponTypes } from './weapons';

const Character = {
    init({ id, name = 'Unnamed', team = 'Unaligned', health = 10, maxHealth = health, attack = 0, defense = 0, magicPower = 0, magicDefense = 0, medicine = 0, statusEffects = [], inventory = [] }) {
        this.id = id;
        this.name = name;
        this.team = team;

        this.health = health;
        this.maxHealth = maxHealth;

        this.attack = attack;
        this.defense = defense;
        this.magicPower = magicPower;
        this.magicDefense = magicDefense;
        this.medicine = medicine;

        this.statusEffects = statusEffects;

        this.baseSkills = {};
        this.skillEnhancements = {};

        this.inventory = inventory;

        this.equipment = {
            [EquipmentSlots.HEAD]: null,
            [EquipmentSlots.BODY]: null,
            [EquipmentSlots.HANDS]: null,
            [EquipmentSlots.LEGS]: null,
            [EquipmentSlots.FEET]: null,
            [EquipmentSlots.LEFT_RING]: null,
            [EquipmentSlots.RIGHT_RING]: null,
            [EquipmentSlots.NECK]: null
        };

        this.loadouts = [
            this.createEmptyLoadout(),
            this.createEmptyLoadout()
        ];

        this.activeLoadout = 0;

        return this;
    },

    create(properties = {}) {
        return Object.create(this).init(properties);
    },

    createEmptyLoadout() {
        return {
            [LoadoutSlots.MAIN_HAND]: null,
            [LoadoutSlots.OFF_HAND]: null,
            [LoadoutSlots.AMMO]: null
        };
    },

    equipItem(slot, item) {
        const isEquipmentSlot = Object.values(EquipmentSlots).includes(slot);
        const isLoadoutSlot = Object.values(LoadoutSlots).includes(slot);

        if (!isEquipmentSlot && !isLoadoutSlot) {
            throw new Error(`Invalid equipment slot: ${slot}, attempted to equip item: ${item}`);
        }

        if (isLoadoutSlot) {
            if (slot === LoadoutSlots.AMMO && this.loadout[LoadoutSlots.MAIN_HAND]) {
                if ((this.loadout[LoadoutSlots.MAIN_HAND].type === WeaponTypes.BOW && item.type === "bolt") ||
                    (this.loadout[LoadoutSlots.MAIN_HAND].type === WeaponTypes.CROSSBOW && item.type === "arrow")) {
                        throw new Error("Incompatible ammo type for equipped weapon");
                }
            }
            if (slot === LoadoutSlots.OFF_HAND && this.loadout[LoadoutSlots.MAIN_HAND] && this.loadout[LoadoutSlots.MAIN_HAND].twoHanded) {
                throw new Error("Cannot equip an off-hand item while using a two-handed weapon.");
            }
            this.loadout[slot] = item;
        } else {
            this.equipment[slot] = item;
        }
    },

    unequipItem(slot) {
        const isEquipmentSlot = Object.values(EquipmentSlots).includes(slot);
        const isLoadoutSlot = Object.values(LoadoutSlots).includes(slot);

        if (!isEquipmentSlot && !isLoadoutSlot) {
            throw new Error(`Attempted to unequip from invalid equipment slot: ${slot}`)
        }

        if (isLoadoutSlot) {
            const unequippedItem = this.loadout[slot];
            this.loadout[slot] = null;

            return unequippedItem;
        } else {
            const unequippedItem = this.equipment[slot];
            this.equipment[slot] = null;

            return unequippedItem;
        }
    },

    swapLoadout() {
        this.activeLoadout = this.activeLoadout === 0 ? 1 : 0;
    },

    get loadout() {
        return this.loadouts[this.activeLoadout];
    },

    get equippedMainHand() {
        return this.loadout[LoadoutSlots.MAIN_HAND];
    },

    get equippedOffHand() {
        return this.loadout[LoadoutSlots.MAIN_HAND];
    },

    get equippedAmmo() {
        return this.loadout[LoadoutSlots.AMMO]
    },

    get equippedItems() {
        return { ...this.equipment, ...this.loadout };
    },   

    hasStatus(statusType) {
        return this.statusEffects.some(status => status.name === statusType);
    },

    isAlive() {
        return this.health > 0;
    },

    getSkillLevel(skillName) {
        const baseLevel = this.baseSkills[skillName] || 0;
        const bonus = this.skillEnhancements[skillName] || 0;

        return baseLevel + bonus;
    },

    getStat(statName) {
        return Object.values(this.equippedItems).reduce(
            (total, item) => total + (item?.[statName] || 0),
            this[statName] || 0
        );
    }
};

const Player = Object.create(Character);

Player.init = function({ id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense, medicine, statusEffects }) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "player",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense,
            medicine,
            statusEffects
        }
    );

    this.inventory = [];
    this.skills = [];

    return this;
};

Player.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

Player.addSkill = function(skill) { this.skills.push(skill); };
Player.addItem = function(item) { this.inventory.push(item); };

const Ally = Object.create(Character);

Ally.init = function({ id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense, medicine, statusEffects }) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "allies",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense,
            medicine,
            statusEffects
        }
    );

    // TODO: Replace hardcoded default. Basic behaviors could be support, defense, aggressive
    this.behavior = "support";
    
    return this;
};

Ally.chooseAction = function() {
    // TODO: Replace placeholder logic
    return this.behavior === "support" ? "heal" : "attack";
};

const Enemy = Object.create(Character);

Enemy.init = function({ id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense, medicine, statusEffects }) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "enemies",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense,
            medicine,
            statusEffects
        }
    );

    // TODO: Replace hardcoded default. Basic behaviors could be support, defense, aggressive
    this.behavior = "aggressive";

    return this;
};

Enemy.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

Enemy.chooseAction = function() {
    return this.isAlive() ? "attack" : "none";
};

export { Character, Ally, Enemy}