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

EquippableItem.init = function(props) {
    BaseItem.init.call(this, props);

    this.skillBonuses = props.skillBonuses;
    this.statBonuses = props.statBonuses;
};

const UsableItem = Object.create(BaseItem);

UsableItem.init = function(props) {
    BaseItem.init.call(this, props);

    this.onUse = props.onUse;
    if (props.uses) {
        this.uses = props.uses;
    }

    return this;
};

UsableItem.use = function(user, targets) {
    if (!this.onUse) {
        console.warn(`Item '${this.name}' has no on-use effect defined`);
        return;
    }

    this.onUse(user, targets);

    if (this.uses) {
        this.uses -= 1;
    }

    if (this.uses && this.uses < 1) {
        // TODO: Destroy item/remove from inventory
    }
};

export { BaseItem, EquippableItem, UsableItem };