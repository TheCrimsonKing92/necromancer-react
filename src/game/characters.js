import {
    EquipmentSlots, LoadoutSlots,
    Equipment, LoadoutEquipment
} from './equipment';
import { Inventory } from './inventory';
import { DEFAULT_STATS } from './stats';

const Character = {    
    // #region Object Creation
    create(properties = {}) {
        return Object.create(this).init(properties);
    },
    init({ id, name = 'Unnamed', team = 'Unaligned', stats = {}, statusEffects = [], inventory }) {
        this.id = id;
        this.name = name;
        this.team = team;

        this.stats = {
            ...DEFAULT_STATS,
            ...stats
        };

        this.statusEffects = statusEffects;

        this.baseSkills = {};
        this.skillEnhancements = {};

        this.inventory = inventory || Inventory.create(this);

        const { HEAD, BODY, HANDS, LEGS, FEET, LEFT_RING, RIGHT_RING, NECK } = EquipmentSlots;
        this.equipment = Equipment.generateSlots([ HEAD, BODY, HANDS, LEGS, FEET, LEFT_RING, RIGHT_RING, NECK ]);

        const { MAIN_HAND, OFF_HAND, AMMO } = LoadoutSlots;
        this.loadouts = [
            LoadoutEquipment.generateSlots([ MAIN_HAND, OFF_HAND, AMMO ]),
            LoadoutEquipment.generateSlots([ MAIN_HAND, OFF_HAND, AMMO ])
        ];

        this.activeLoadout = 0;

        return this;
    },
    // #endregion

    // #region Inventory Management
    
    addItemToInventory(item) {
        this.inventory.addItem(item);
    },

    removeItemFromInventory(item) {
        this.inventory.removeItem(item);
    },

    // #endregion

    // #region Equipment and Loadouts
    equipItem(slot, item) {
        const isEquipmentSlot = this.equipment.hasSlot(slot);
        const isLoadoutSlot = this.loadout.hasSlot(slot);

        if (!isEquipmentSlot && !isLoadoutSlot) {
            throw new Error(`Invalid slot: ${slot}, attempted to equip item: ${item}`);
        }

        if (isLoadoutSlot) {
            this.loadout.equipItem(slot, item);
        } else {
            this.equipment.equipItem(slot, item);
        }
    },

    swapLoadout() {
        this.activeLoadout = this.activeLoadout === 0 ? 1 : 0;
    },

    unequipItem(slot) {
        const isEquipmentSlot = this.equipment.hasSlot(slot);
        const isLoadoutSlot = this.loadout.hasSlot(slot);

        if (!isEquipmentSlot && !isLoadoutSlot) {
            throw new Error(`Attempted to unequip from invalid equipment slot: ${slot}`)
        }

        if (isLoadoutSlot) {
            return this.loadout.unequipItem(slot);
        } else {
            return this.equipment.unequipItem(slot);
        }
    },

    get equippedItems() {
        return [ ...this.equipment.getItems(), ...this.loadout.getItems() ];
    },

    get loadout() {
        return this.loadouts[this.activeLoadout];
    },

    // #endregion
    
    // #region Skills
    addSkill(skill) {
        this.baseSkills.push(skill);
    },

    getSkillLevel(skillName) {
        const baseLevel = this.baseSkills[skillName] || 0;
        const bonus = this.skillEnhancements[skillName] || 0;

        return baseLevel + bonus;
    },
    // #endregion

    // #region Stats and Status(es)
    getStat(statName) {
        return this.equippedItems.reduce(
            (total, item) => total + (item?.[statName] || 0),
            this.stats[statName] || 0
        );
    },
    
    setStat(statName, value) {
        if (!this.stats.hasOwnProperty(statName)) {
            throw new Error(`Attempted to set non-existent stat: ${statName} to value ${value}`);
        }

        this.stats[statName] = value;
    },

    get health() {
        return this.getStat('health');
    },

    set health(value) {
        this.setStat('health', value);
    },

    hasStatus(statusType) {
        return this.statusEffects.some(status => status.name === statusType);
    },

    isAlive() {
        return this.health > 0;
    }
    // #endregion
};

const Player = Object.create(Character);

Player.init = function({ id, name, stats, statusEffects, inventory }) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "player",
            stats,
            statusEffects,
            inventory
        }
    );

    return this;
};

Player.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

const Ally = Object.create(Character);

Ally.init = function({ id, name, stats, statusEffects, inventory }) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "allies",
            stats,
            statusEffects,
            inventory
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