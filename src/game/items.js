const Item = {
    init({ name, description, effect, targetType }) {
        this.name = name;
        this.description = description;
        this.effect = effect;
        this.targetType = targetType;

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