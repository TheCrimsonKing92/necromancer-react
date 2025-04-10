import {
    EquipmentSlots, LoadoutSlots,
    Equipment, LoadoutEquipment
} from './equipment';
import { Inventory } from './inventory';
import { DEFAULT_STATS } from './stats';

const { HEAD, BODY, HANDS, WAIST, LEGS, FEET, LEFT_RING, RIGHT_RING, NECK } = EquipmentSlots;
const { MAIN_HAND, OFF_HAND, AMMO } = LoadoutSlots;

const Character = {    
    // #region Object Creation
    create(properties = {}) {
        return Object.create(this).init(properties);
    },
    init({ id, characterClass="Commoner", name = 'Unnamed', team = 'Unaligned', stats = {}, statusEffects = [], inventory, level = 1, experience = 0 }) {
        this.id = id;
        this.characterClass = characterClass;
        this.name = name;
        this.team = team;

        this.stats = {
            ...DEFAULT_STATS,
            ...stats
        };

        this.statusEffects = statusEffects;

        this.skills = {};

        this.inventory = inventory || Inventory.create(this);

        this.level = level;
        this.experience = experience;

        this.equipment = Equipment.generateSlots([ HEAD, BODY, HANDS, WAIST, LEGS, FEET, LEFT_RING, RIGHT_RING, NECK ]);

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
        this.skills.push(skill);
    },

    getSkillLevel(skillName) {
        return this.equippedItems.reduce(
          (total, item) => total + (item?.skillBonuses?.[skillName] || 0),
          this.baseSkills[skillName] || 0
        );
    },
    // #endregion

    // #region Stats and Status(es)
    getStat(statName) {
        return this.equippedItems.reduce(
            (total, item) => total + (item?.statBonuses?.[statName] || 0),
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

Player.init = function({ id, characterClass, name, stats, statusEffects, inventory, level, experience }) {
    Character.init.call(
        this,
        {
            id,
            characterClass,
            name,
            team: "player",
            stats,
            statusEffects,
            inventory,
            level,
            experience
        }
    );

    return this;
};

Player.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

const Ally = Object.create(Character);

Ally.init = function({ id, characterClass, name, stats, statusEffects, inventory, level, experience }) {
    Character.init.call(
        this,
        {
            id,
            characterClass,
            name,
            team: "allies",
            stats,
            statusEffects,
            inventory,
            level,
            experience
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

Enemy.init = function({ id, characterClass, name, stats, statusEffects, inventory, level, experience }) {
    Character.init.call(
        this,
        {
            id,
            characterClass,
            name,
            team: "enemies",
            stats,
            statusEffects,
            inventory,
            level,
            experience
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

export { Character, Player, Ally, Enemy}