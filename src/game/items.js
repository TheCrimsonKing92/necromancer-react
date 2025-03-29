import {
    EquipmentSlots, LoadoutSlots,
    ValidEquipmentSlots, ValidLoadoutSlots
} from './equipment';

const validateAllowedSlots = (allowedSlots) => {
    const validSlots = new Set([
        ...ValidEquipmentSlots,
        ...ValidLoadoutSlots
    ]);

    const invalidSlots = allowedSlots.filter(slot => !validSlots.has(slot));
    if (invalidSlots.length > 0) {
        throw new Error(`Invalid allowed slots: ${invalidSlots.join(', ')}`);
    }
};

const BaseItem = {
    create(properties) {
        return Object.create(this).init(properties);
    },

    init({ name = "Unnamed Item", description = "", weight = 0 }) {
        this.name = name;
        this.description = description;
        this.weight = weight;

        return this;
    }
};

const EquippableItem = Object.create(BaseItem);
EquippableItem.defaultSlots = [ EquipmentSlots.BODY ];

EquippableItem.init = function(props) {
    BaseItem.init.call(this, props);

    this.allowedSlots = props.allowedSlots ? props.allowedSlots.slice() : this.defaultSlots.slice();
    validateAllowedSlots(this.allowedSlots);
    
    this.skillBonuses = props.skillBonuses;
    this.statBonuses = props.statBonuses;

    return this;
};

const Armor = Object.create(EquippableItem);

Armor.init = function(props) {
    EquippableItem.init.call(this, props);

    this.defense = props.defense;
    this.slot = props.slot; // I question this, but we'll roll with it for now

    return this;
};

const Accessory = Object.create(EquippableItem);
Accessory.defaultSlots = [ EquipmentSlots.LEFT_RING, EquipmentSlots.RIGHT_RING ];

const Weapon = Object.create(EquippableItem);
Weapon.defaultSlots = [ LoadoutSlots.MAIN_HAND, LoadoutSlots.OFF_HAND ];

Weapon.init = function(props) {
    EquippableItem.init.call(this, props);

    this.weaponType = props.weaponType;
    this.baseDamage = props.baseDamage;
    this.twoHanded = !!props.twoHanded;

    return this;
};

const UsableItem = Object.create(BaseItem);

UsableItem.init = function(props) {
    BaseItem.init.call(this, props);

    this.onUse = props.onUse;

    return this;
};

UsableItem.use = function(user, targets) {
    if (!this.onUse) {
        console.warn(`Item '${this.name}' has no on-use effect defined`);
        return;
    }

    this.onUse(user, targets);
};

const Consumable = Object.create(UsableItem);

Consumable.init = function(props) {
    UsableItem.init.call(this, props);

    this.uses = props.uses || 1;

    return this;
};

Consumable.use = function(user, targets) {
    UsableItem.use.call(this, user, targets);

    this.uses -= 1;

    if (this.uses < 1) {
        // TODO: Remove from the inventory here, or inventory will have to check uses after the call to this function
        console.log(`${this.name} has been consumed`);
    }
};

export {
    BaseItem, EquippableItem, UsableItem, Consumable,
    Armor, Accessory, Weapon
};