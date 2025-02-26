import { TargetSelection } from "./targeting";

const Skill = {
    init(name, description, effects, targetType, targetCount = 1, targetSelection = TargetSelection.CHOICE ) {
        this.name = name;
        this.description = description;
        this.effects = effects;
        this.targetType = targetType;
        this.targetCount = targetCount;
        this.targetSelection = targetSelection;

        return this;
    },

    describe(user, targets) {
        const targetNames = targets.map(target => target.name).join(", ");

        return `${user.name} uses ${this.name} on ${targetNames}.`;
    },

    effect(entities, user, targets) {
        const updatedEntities = entities.map(entity => {
            if (!targets.some(target => target.id === entity.id)) {
                return entity; // Unaffected entities remain unchanged
            }

            let updatedEntity = Object.assign(Object.create(entity), entity);

            this.effects.forEach(effect => {
                const updatedAttributes = effect.apply(user, updatedEntity)
                const updateKeys = Object.keys(updatedAttributes);

                if (updateKeys.length > 0) {
                    for (const attr of updateKeys) {
                        updatedEntity[attr] = updatedAttributes[attr];
                    }
                }
            });

            return updatedEntity;
        });

        return { updatedEntities, description: this.describe(user, targets) };
    }
};

export { Skill };