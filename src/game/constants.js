const EffectCategories = {
    DAMAGE: "damage",
    HEALING: "healing",
    STATUS: "status"
};

const ValidEffectCategories = new Set(Object.values(EffectCategories));

const ItemCategories = {
    ACCESSORY: "accessory",
    ARMOR: "armor",
    CONSUMABLE: "consumable",
    WEAPON: "weapon"
};

const ValidItemCategories = new Set(Object.values(ItemCategories));

const RarityTypes = {
    COMMON: "Common",
    UNCOMMON: "Uncommon",
    RARE: "Rare",
    EPIC: "Epic",
    LEGENDARY: "Legendary"
};

const RarityData = {
    COMMON: {
        name: RarityTypes.COMMON,
        baseMultiplier: 1,
        magicCount: 0
    },
    UNCOMMON: {
        name: RarityTypes.UNCOMMON,
        baseMultiplier: 1.1,
        magicCount: 1
    },
    RARE: {
        name: RarityTypes.RARE,
        baseMultiplier: 1.25,
        magicCount: 2
    },
    EPIC: {
        name: RarityTypes.EPIC,
        baseMultiplier: 1.5,
        magicCount: 3
    },
    LEGENDARY: {
        name: RarityTypes.LEGENDARY,
        baseMultiplier: 2,
        magicCount: 4
    }
};

const Rarities = new Set(Object.values(RarityData).map(rarity => rarity.name));

const getRarity = (rarityName) => {
    if (!Rarities.has(rarityName)) {
        throw new Error(`Unknown rarity: ${rarityName}`);
    }
    
    return Object.values(RarityData).find(rarity => rarity.name === rarityName);
};

export {
    RarityData, Rarities, RarityTypes,
    getRarity,
    EffectCategories, ItemCategories,
    ValidEffectCategories, ValidItemCategories
};