import { RarityTypes } from "./constants";

const MaterialTypes = {
    // Metal
    WROUGHT_IRON: "Wrought Iron",
    BRONZE: "Bronze",
    IRON: "Iron",
    STEEL: "Steel",
    MITHRIL: "Mithril",
    STARSTEEL: "Starsteel",
    ADAMANTINE: "Adamantine",

    // Organic, mineral
    WOOD: "Wood",
    ELDER_WOOD: "Elder Wood",    
    BONE: "Bone",
    NECROTIC_BONE: "Necrotic Bone",
    ANCIENT_BONE: "Ancient Bone",
    CRYSTAL: "Crystal",
};

const ValidMaterialTypes = new Set(Object.values(MaterialTypes));

const Materials = [
    {
        name: MaterialTypes.WROUGHT_IRON,
        rarity: RarityTypes.COMMON,
        description: "Low-quality iron, often impure and crudely shaped. Suitable for crude weapons and armor.",
        tags: [ "metal", "crude", "low-tier", "brittle", "imperfect", "blacksmith-basic" ],
        use: {
            weapon: {
                baseDamageRange: [ 3, 5 ],
                critChance: 1
            },
            armor: {
                baseDefenseRange: [ 4, 6 ]
            }
        }
    },
    {
        name: MaterialTypes.BONE,
        rarity: RarityTypes.COMMON,
        description: "Salvaged from beasts or humanoids, bone is brittle but lightweight. Used in primitive gear.",
        tags: [ "organic", "low-tier", "brittle", "necromantic", "ritual", "lightweight" ],
        use: {
            weapon: {
                baseDamageRange: [ 4, 6 ],
                critChance: 0
            },
            armor: {
                baseDefenseRange: [ 2, 4 ]
            }
        }
    },
    {
        name: MaterialTypes.BRONZE,
        rarity: RarityTypes.COMMON,
        description: "An alloy of copper and tin. Bronze weapons hit harder than iron but lack finesse.",
        tags: [ "metal", "low-tier", "ancient-tech", "alloy", "durable", "pre-steel" ],
        use: {
            weapon: {
                baseDamageRange: [ 6, 8 ],
                critChance: 0
            },
            armor: {
                baseDefenseRange: [ 5, 7 ]
            }
        }
    },
    {
        name: MaterialTypes.IRON,
        rarity: RarityTypes.UNCOMMON,
        description: "Refined iron, reliable and well-balanced. Favored for its versatility.",
        tags: [ "metal", "mid-tier", "common", "balanced", "reliable", "versatile" ],
        use: {
            weapon: {
                baseDamageRange: [ 5, 7 ],
                critChance: 5
            },
            armor: {
                baseDefenseRange: [ 8, 10 ]
            }
        }
    },
    {
        name: MaterialTypes.STEEL,
        rarity: RarityTypes.UNCOMMON,
        description: "Tempered for strength and durability. A standard of quality in most arsenals.",
        tags: [ "metal", "mid-tier", "refined", "tempered", "versatile", "military-grade" ],
        use: {
            weapon: {
                baseDamageRange: [ 7, 9 ],
                critChance: 1
            },
            armor: {
                baseDefenseRange: [ 10, 12 ]
            }
        }
    },
    {
        name: MaterialTypes.MITHRIL,
        rarity: RarityTypes.RARE,
        description: "An alchemical silver-steel alloy. Enhances divine magic and harms the undead.",
        tags: [ "metal", "high-tier", "rare", "alchemical", "sacred", "undead-slaying", "magic-conductive", "lightweight", "curse-resistant" ],
        use: {
            weapon: {
                baseDamageRange: [ 9, 11 ],
                critChance: 15
            },
            armor: {
                baseDefenseRange: [ 11, 13 ]
            }
        }
    },
    {
        name: MaterialTypes.STARSTEEL,
        rarity: RarityTypes.EPIC,
        description: "Forged from meteoric iron. Exceptional light and strong, with cosmic resonance.",
        tags: [ "metal", "high-tier", "rare", "celestial", "conductive", "mystic-forged", "artifact-grade" ],
        use: {
            weapon: {
                baseDamageRange: [ 10, 13 ],
                critChance: 5
            },
            armor: {
                baseDefenseRange: [ 12, 15 ]
            }
        }
    },
    {
        name: MaterialTypes.ADAMANTINE,
        rarity: RarityTypes.LEGENDARY,
        description: "Unbreakable and impossibly dense. The pinnacle of metallurgy.",
        tags: [ "metal", "legendary", "high-tier", "nigh-indestructible", "weighty", "dark-forged", "anti-magic", "fortification-grade" ],
        use: {
            weapon: {
                baseDamageRange: [ 12, 16 ],
                critChance: 20
            },
            armor: {
                baseDefenseRange: [ 14, 18 ]
            }
        }
    }
];

const getMaterialData = (materialName, itemType) => {
    if (!ValidMaterialTypes.has(materialName)) {
        throw new Error(`Unknown material type: ${materialName}`);
    }

    const material = Materials.find(m => m.name === materialName);

    if (!material) {
        throw new Error(`Unknown material: ${materialName}`);
    }

    // name, rarity, description, tags
    return {
        name: material.name,
        rarity: material.rarity,
        description: material.description,
        tags: material.tags,
        ...material.use[itemType]
    };
};

const getMaterialsData = (materials, itemType) => materials.map(material => getMaterialData(material, itemType));

export { Materials, MaterialTypes, getMaterialData, getMaterialsData };