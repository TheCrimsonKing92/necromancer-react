const HealingTypes = {
    MEDICINE: "medicine",
    MAGIC: "magic"
};

const ValidHealingTypes = new Set(Object.values(HealingTypes));

export { HealingTypes, ValidHealingTypes };