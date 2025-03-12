const EffectCategories = {
    DAMAGE: "damage",
    HEALING: "healing",
    STATUS: "status"
};

const ValidEffectCategories = new Set(Object.values(EffectCategories));

export {
    EffectCategories,
    ValidEffectCategories
};