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

    effect(user, targets) {
        return this.effects.reduce((updates, effect) => Object.assign(updates, effect.apply(user, targets)));
    }
};

export { Skill };