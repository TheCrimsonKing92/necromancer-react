import {
    EquipmentSlots, LoadoutSlots,
    Equipment, LoadoutEquipment
} from './equipment';
import { Inventory } from './inventory';

const Character = {
    init({ id, name = 'Unnamed', team = 'Unaligned', health = 10, maxHealth = health, attack = 0, defense = 0, magicPower = 0, magicDefense = 0, medicine = 0, strength = 0, statusEffects = [], inventory }) {
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
        this.strength = strength;

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
    
    addSkill(skill) {
        this.baseSkills.push(skill);
    },

    create(properties = {}) {
        return Object.create(this).init(properties);
    },

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

    getSkillLevel(skillName) {
        const baseLevel = this.baseSkills[skillName] || 0;
        const bonus = this.skillEnhancements[skillName] || 0;

        return baseLevel + bonus;
    },

    getStat(statName) {
        return this.equippedItems.reduce(
            (total, item) => total + (item?.[statName] || 0),
            this[statName] || 0
        );
    },  

    hasStatus(statusType) {
        return this.statusEffects.some(status => status.name === statusType);
    },

    isAlive() {
        return this.health > 0;
    },

    swapLoadout() {
        this.activeLoadout = this.activeLoadout === 0 ? 1 : 0;
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