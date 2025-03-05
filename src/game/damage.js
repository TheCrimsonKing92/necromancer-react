const DamageCalculationTypes = {
    FLAT: "flat",
    TARGET_CURRENT_HP_PERCENT: "target_current_hp_percent",
    TARGET_MAX_HP_PERCENT: "target_max_hp_percent",
    USER_MAX_HP_PERCENT: "user_max_hp_percent"
};

const DamageCalculators = {
    [DamageCalculationTypes.FLAT]: (user, target, baseDamage) => baseDamage,
    [DamageCalculationTypes.TARGET_CURRENT_HP_PERCENT]: (user, target, baseDamage) => Math.floor(target.health * (baseDamage / 100)),
    [DamageCalculationTypes.TARGET_MAX_HP_PERCENT]: (user, target, baseDamage) => Math.floor(target.maxHealth * (baseDamage / 100)),
    [DamageCalculationTypes.USER_MAX_HP_PERCENT]: (user, target, baseDamage) => Math.floor(user.maxHealth * (baseDamage / 100))
};

const DamageTypes = {
    PHYSICAL: "physical",
    MAGICAL: "magical",
    FIRE: "fire",
    COLD: "cold",
    LIGHTNING: "lightning",
    POISON: "poison"
};

const ValidDamageTypes = new Set(Object.values(DamageTypes));

export { DamageCalculationTypes, DamageCalculators, DamageTypes, ValidDamageTypes };