const WeaponClasses = {
    SIMPLE_MELEE: "simple_melee",
    MARTIAL_MELEE: "martial_melee",
    SIMPLE_RANGED: "simple_ranged",
    MARTIAL_RANGED: "martial_ranged",
    MAGIC: "magic"
};

const WeaponTypes = {
    SWORD: "sword",
    AXE: "axe",
    DAGGER: "dagger",
    SPEAR: "spear",
    MACE: "mace",
    BOW: "bow",
    CROSSBOW: "crossbow",
    STAFF: "staff",
    WAND: "wand"
};

const WeaponProperties = {
    TWO_HANDED: "two_handed",
    DUAL_WIELDABLE: "dual_wieldable",
    AMMO_REQUIRED: "ammo_required",
    FINESSE: "finesse",
    REACH: "reach",
    THROWN: "thrown",
    MAGICAL_EFFECTS: "magical_effects"
};

const MagicEffects = {
    FIRE_DAMAGE: { type: EffectTypes.DAMAGE, damageType: DamageTypes.FIRE, bonus: 5 },
    LIGHTNING_DAMAGE: { type: EffectTypes.DAMAGE, damageType: DamageTypes.LIGHTNING, bonus: 5 },
    LIFE_STEAL: { type: EffectTypes.HEALING, percent: 10 },
    STATUS_BURN: { type: EffectTypes.STATUS, statusType: StatusTypes.BURN, duration: 3 },
    STATUS_PARALYZE: { type: EffectTypes.STATUS, statusType: StatusTypes.STUN, duration: 2 },
    ATTACK_BOOST: { type: "stat_boost", stat: "attack", bonus: 3 },
    DEXTERITY_BOOST: { type: "stat_boost", stat: "dexterity", bonus: 3 }
};

const AllowedMagicEffects = {
    [WeaponTypes.SWORD]: [
        MagicEffects.FIRE_DAMAGE,
        MagicEffects.ATTACK_BOOST
    ],
    [WeaponTypes.AXE]: [
        MagicEffects.LIFE_STEAL,
        MagicEffects.STATUS_BURN
    ],
    [WeaponTypes.BOW]: [
        MagicEffects.LIGHTNING_DAMAGE,
        MagicEffects.DEXTERITY_BOOST, MagicEffects.STATUS_PARALYZE
    ],
    [WeaponTypes.STAFF]: Object.values(MagicEffects) // Staves can roll anything
};

const WeaponRarities = {
    COMMON: {
        name: "Common",
        baseMultiplier: 1,
        magicCount: 0
    },
    UNCOMMON: {
        name: "Uncommon",
        baseMultiplier: 1.1,
        magicCount: 1
    },
    RARE: {
        name: "rare",
        baseMultiplier: 1.25,
        magicCount: 2
    },
    EPIC: {
        name: "Epic",
        baseMultiplier: 1.5,
        magicCount: 3
    },
    LEGENDARY: {
        name: "Legendary",
        baseMultiplier: 2,
        magicCount: 4
    }
};

const generateMagicWeapon = (baseWeapon, rarity) => {
    if (!rarity.magicCount) return baseWeapon; // No magic if Common

    let magicEffects = [];
    let possibleEffects = AllowedMagicEffects[baseWeapon.type] || [];

    while (magicEffects.length < rarity.magicCount && possibleEffects.length > 0) {
        let effectIndex = Math.floor(Math.random() * possibleEffects.length);
        magicEffects.push(possibleEffects.splice(effectIndex, 1)[0]); // Remove to prevent duplicates
    }

    return {
        ...baseWeapon,
        baseDamage: Math.floor(baseWeapon.baseDamage * rarity.baseMultiplier),
        rarity: rarity.name,
        magicalEffects: magicEffects
    };
};