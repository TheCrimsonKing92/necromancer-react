const EffectTypes = {
    DAMAGE: "damage",
    HEALING: "healing",
    STATUS: "status"
};

const ValidEffectTypes = new Set(Object.values(EffectTypes));

export {
    EffectTypes,
    ValidEffectTypes
};