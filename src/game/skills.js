import { Effect } from "./effects";
import { TargetSelection } from "./targeting";

const Skill = {
    init(name, description, effects, targetType, targetCount = 1, targetSelection = TargetSelection.CHOICE ) {
        this.name = name;
        this.description = description;
        this.effects = effects.map(effectData => Object.create(Effect).init(effectData.type, effectData.params));
        this.targetType = targetType;
        this.targetCount = targetCount;
        this.targetSelection = targetSelection;

        return this;
    },

    describe(user, targets) {
        const targetNames = targets.map(target => target.name).join(", ");

        return `${user.name} uses ${this.name} on $${targetNames}.`;
    },

    // Revise this so the overall updates object is keyed by target id and the updates for *that* target are the value
    effect(entities, user, targets) {        
        const updatedEntities = entities.map(entity => {
            if (!targets.some(target => target.id === entity.id)) {
                return entity; // Unaffected entities remain unchanged
            }

            let updatedEntity = { ...entity };

            this.effects.forEach(effect => {
                const updatedAttributes = effect.apply(user, updatedEntity);
                if (Object.keys(updatedAttributes).length > 0) {
                    updatedEntity = { ...updatedEntity, ...updatedAttributes };
                }
            });

            descriptions.push(this.describe(user, updatedEntity));

            return updatedEntity;
        });

        return { updatedEntities, descriptions };
    }
};

export { Skill };