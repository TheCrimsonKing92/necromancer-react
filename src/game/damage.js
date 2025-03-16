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

const DamageSource = {
    MAGICAL: "magical",
    PHYSICAL: "physical"
};

const DamageStatBySource = {
    [DamageSource.MAGICAL]: "magicPower",
    [DamageSource.PHYSICAL]: "mattack"
};

const DefenseStatBySource = {
    [DamageSource.MAGICAL]: "magicDefense",
    [DamageSource.PHYSICAL]: "defense"
};

const DamageTypes = {
    NORMAL: "normal", // Default
    SLASHING: "slashing", // Swords, axes
    PIERCING: "piercing", // Daggers, spears, arrows
    CRUSHING: "crushing", // Hammers, clubs, fists
    MAGICAL: "magical",
    FIRE: "fire",
    COLD: "cold",
    LIGHTNING: "lightning",
    POISON: "poison"
};

const ElementalDamageModifiers = {
    [DamageTypes.FIRE]: "firePower",
    [DamageTypes.COLD]: "coldPower",
    [DamageTypes.LIGHTNING]: "lightningPower",
    [DamageTypes.POISON]: "poisonPower"
};

const ElementalResistanceModifiers = {
    [DamageTypes.FIRE]: "fireResistance",
    [DamageTypes.COLD]: "coldResistance",
    [DamageTypes.LIGHTNING]: "lightningResistance",
    [DamageTypes.POISON]: "poisonResistance"
};

const applyResistance = (damage, target, damageType) => {
    const resistanceStat = ElementalResistanceModifiers[damageType];
    const baseResistance = target.getStat(resistanceStat) || 0;
    const SOFT_CAP = 50;
    const DECAY_START = 75;
    const HARD_CAP = 95;
    const REDUCTION_SCALING = 2;
    const DECAY_SCALING = 3;

    let effectiveResistance = baseResistance;

    if (baseResistance > SOFT_CAP) {
        const excess = baseResistance - SOFT_CAP;

        if (baseResistance > DECAY_START) {
            const decayExcess = baseResistance - DECAY_START;
            effectiveResistance = SOFT_CAP + (DECAY_START - SOFT_CAP) / REDUCTION_SCALING + decayExcess / DECAY_SCALING;
        } else {
            effectiveResistance = SOFT_CAP + excess / REDUCTION_SCALING;
        }
    }

    effectiveResistance = Math.min(effectiveResistance, HARD_CAP);
    return damage * (1 - effectiveResistance / 100);
};

const calculateElementalDamage = (user, target, baseDamage, damageType, damageSource, calculationType) => {
    if (!DamageCalculators[calculationType]) {
        throw new Error(`Unsupported damage calculation type: ${calculationType}`);
    }

    const scalingStat = DamageStatBySource[damageSource] || "attack";
    const defenseStat = DefenseStatBySource[damageSource] || "defense";
    const powerStat = ElementalDamageModifiers[damageType];
    const elementalPower = user.getStat(powerStat) || 0;

    const calculation = DamageCalculators[calculationType];

    const initialDamage = calculation(user, target, baseDamage) + user.getStat(scalingStat);
    const scaledDamage = initialDamage * (1 + (elementalPower / 100));
    const resisted = applyResistance(scaledDamage, target, damageType);
    const reduced = Math.max(resisted - target.getStat(defenseStat), 1);

    return reduced;
};

const calculatePhysicalDamage = (user, target, baseDamage, damageType, calculationType) => {
    if (!DamageCalculators[calculationType]) {
        throw new Error(`Unsupported damage calculation type: ${calculationType}`);
    }

    const attackStat = user.getStat('attack');
    const defenseStat = target.getStat('defense');

    const calculation = DamageCalculators[calculationType];

    const damage = calculation(user, target, baseDamage) + attackStat - defenseStat;
    return Math.max(damage, 1);
};

const calculateDamage = (user, target, baseDamage, damageType, damageSource, calculationType) => {
    if (!DamageCalculators[calculationType]) {
        throw new Error(`Unsupported damage calculation type: ${calculationType}`);
    }

    const isElemental = DamageTypes.MAGICAL === damageType || Object.keys(ElementalDamageModifiers).includes(damageType);

    if (isElemental) {
        return calculateElementalDamage(user, target, baseDamage, damageType, damageSource, calculationType);
    }

    return calculatePhysicalDamage(user, target, baseDamage, damageType, calculationType);
};

const ValidDamageTypes = new Set(Object.values(DamageTypes));

export { 
    calculateDamage,
    DamageCalculationTypes, DamageCalculators, DamageSource, DamageTypes, ValidDamageTypes
};