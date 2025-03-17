const Inventory = {
    create(character) {
        return Object.create(this).init(character);
    },

    init(character) {
        this.character = character;
        this.items = [];
        // TODO: Revisit later
        this.baseCapacity = 50;

        return this;
    },

    getCurrentWeight() {
        return this.items.reduce((total, item) => {
            const itemWeight = item.weight || 0;
            return total + itemWeight;
        }, 0);
    },

    // TODO: Reevaluate later
    getMaxCapacity() {
        return this.baseCapacity + (2 * this.character.getStat('strength'));
    },

    canAddItem(item) {
        const newWeight = this.getCurrentWeight() + (item.weight || 0);
        return newWeight <= this.getMaxCapacity();
    },

    addItem(item) {
        if (!this.canAddItem(item)) {
            throw new Error("Not enough inventory capacity to add item:", item);
        }

        this.items.push(item);
    },

    removeItem(item) {
        const idx = this.items.indexOf(item);

        if (idx < 0) {
            throw new Error('No such item in inventory:', item);
        }

        this.items.splice(idx, 1);
        
        return item;
    },

    findItems(predicate) {
        return this.items.filter(predicate);
    }
};

export { Inventory };