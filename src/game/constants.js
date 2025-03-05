const EffectTypes = {
    DAMAGE: "damage",
    HEALING: "healing",
    STATUS: "status"
};

const HealingTypes = {
    MEDICINE: "medicine",
    MAGIC: "magic"
};

const ValidEffectTypes = new Set(Object.values(EffectTypes));
const ValidHealingTypes = new Set(Object.values(HealingTypes));

export {
    EffectTypes, HealingTypes,
    ValidEffectTypes, ValidHealingTypes
};