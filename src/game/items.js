const Item = {
    init({ name, description, effect, targetType, ...rest }) {
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.targetType = targetType;

        for (const prop in rest) {
            this[prop] = rest[prop];
        }

        return this;
    },

    create(properties) {
        return Object.create(this).init(properties);
    },

    use(user, targets) {
        if (!this.effect) {
            console.warn(`Item ${this.name} has no effect defined.`);
            return {};
        }

        const updates = Object.fromEntries(targets.map(target => [ target.id, this.effect(user, target) ]));
        return updates;
    }
};

export { Item };