import { deepCopy } from "../utils/copy";
import { DamageTypes } from "./damage";
import { EffectTypes } from "./effects";
import { MaterialTypes } from "./materials";
import { StatusTypes } from "./statuses";

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

const WeaponMaterialPools = {
    [WeaponTypes.SWORD]: [
        MaterialTypes.WROUGHT_IRON, MaterialTypes.BONE, MaterialTypes.BRONZE, MaterialTypes.IRON,
        MaterialTypes.STEEL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.AXE]: [
        MaterialTypes.WROUGHT_IRON, MaterialTypes.BRONZE, MaterialTypes.IRON, MaterialTypes.STEEL,
        MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.DAGGER]: [
        MaterialTypes.WROUGHT_IRON, MaterialTypes.BONE, MaterialTypes.BRONZE, MaterialTypes.IRON,
        MaterialTypes.STEEL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.SPEAR]: [
        MaterialTypes.WROUGHT_IRON, MaterialTypes.BONE, MaterialTypes.BRONZE, MaterialTypes.IRON,
        MaterialTypes.STEEL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.MACE]: [
        MaterialTypes.WROUGHT_IRON, MaterialTypes.BONE, MaterialTypes.BRONZE, MaterialTypes.IRON,
        MaterialTypes.STEEL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.BOW]: [
        MaterialTypes.WOOD, MaterialTypes.ELDER_WOOD
    ],
    [WeaponTypes.CROSSBOW]: [
        MaterialTypes.WOOD, MaterialTypes.ELDER_WOOD, MaterialTypes.WROUGHT_IRON, MaterialTypes.BRONZE,
        MaterialTypes.IRON, MaterialTypes.STEEL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE
    ],
    [WeaponTypes.STAFF]: [
        MaterialTypes.ELDER_WOOD, MaterialTypes.CRYSTAL, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL,
        MaterialTypes.ADAMANTINE, MaterialTypes.BONE, MaterialTypes.NECROTIC_BONE, MaterialTypes.ANCIENT_BONE
    ],
    [WeaponTypes.WAND]: [
        MaterialTypes.CRYSTAL, MaterialTypes.ELDER_WOOD, MaterialTypes.MITHRIL, MaterialTypes.STARSTEEL, MaterialTypes.ADAMANTINE,
        MaterialTypes.BONE, MaterialTypes.NECROTIC_BONE, MaterialTypes.ANCIENT_BONE
    ]
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

export {
    AllowedMagicEffects,
    WeaponMaterialPools, WeaponTypes
};