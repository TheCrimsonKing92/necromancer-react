const Effect = {
    init(type, onApply, applyCondition = () => true) {
        this.type = type;
        this.applySingleTarget = function(user, target) {
            return this.applyCondition(user, target) ? onApply(user, target) : {};
        }
        this.applyCondition = applyCondition;

        return this;
    },
    apply(user, targets) {
        return Object.fromEntries(targets.map(target => [ target.id, this.applySingleTarget(user, target) ]));
    }
};

const DamageEffect = Object.create(Effect);
DamageEffect.init = function(baseDamage, applyCondition) {
    Effect.init.call(this, "damage", function(user, target) {
        return {
            health: target.health - this.baseDamage
        };
    }, applyCondition);

    this.baseDamage = baseDamage;

    return this;
};

const HealingEffect = Object.create(Effect);
HealingEffect.init = function(baseHealing, applyCondition) {
    Effect.init.call(this, "healing", function(user, target) {
        return {
            health: Math.min(target.maxHealth, target.health + this.baseHealing)
        }
    }, applyCondition);

    this.baseHealing = baseHealing;

    return this;
};

const StatusEffect = Object.create(Effect);
StatusEffect.init = function(statusType, duration, applyCondition) {
    Effect.init.call(this, "status", function(user, target) {
        return {
            status: [ ...(target.status || []), { type: this.statusType, duration: this.duration } ]
        };
    }, applyCondition);
    
    this.statusType = statusType;
    this.duration = duration;

    return this;
};

export { Effect, DamageEffect, HealingEffect, StatusEffect };