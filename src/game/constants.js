const DamageTypes = {
    PHYSICAL: "physical",
    MAGICAL: "magical",
    FIRE: "fire",
    COLD: "cold",
    LIGHTNING: "lightning",
    POISON: "poison"
};

const EffectTypes = {
    DAMAGE: "damage",
    HEALING: "healing",
    STATUS: "status"
};

const HealingTypes = {
    MEDICINE: "medicine",
    MAGIC: "magic"
};

const ValidDamageTypes = new Set(Object.values(DamageTypes));
const ValidEffectTypes = new Set(Object.values(EffectTypes));
const ValidHealingTypes = new Set(Object.values(HealingTypes));

export {
    DamageTypes, EffectTypes, HealingTypes,
    ValidDamageTypes, ValidEffectTypes, ValidHealingTypes
};