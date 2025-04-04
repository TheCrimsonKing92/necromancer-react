import { deepCopy } from "../utils/copy";
import { getRarity, ItemCategories } from "./constants";
import { getMaterialData } from "./materials";
import { getRandomElement, getRandomInRange } from "../utils/random";
import { AllowedMagicEffects, WeaponTypes, WeaponMaterialPools } from "./weapons";

const generateAccessory = (options = {}) => {

};

const generateArmor = (options = {}) => {

};

const generateConsumable = (options = {}) => {

};

const generateWeapon = (options = {}) => {
    let { materialName, weaponType = WeaponTypes.SWORD, name } = options;

    // Generate when not provided
    if (!materialName) {
        const weaponMaterials = WeaponMaterialPools[weaponType];
        materialName = getRandomElement(weaponMaterials);
    }

    const materialData = getMaterialData(materialName, ItemCategories.WEAPON);
    const rarity = getRarity(materialData.rarity);
    const baseDamage = getRandomInRange(materialData.baseDamageRange);
    const critChance = materialData.critChance || 0;

    const generatedName = name || `${materialName} ${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}`;

    const basicWeapon = {
        weaponType,
        material: materialName,
        name: generatedName,
        baseDamage,
        critChance
    };

    if (!rarity.magicCount || rarity.magicCount < 1) {
        return basicWeapon;
    }

    return generateMagicWeapon(basicWeapon, rarity);
};

const generateMagicWeapon = (baseWeapon, rarity) => {
    if (!rarity.magicCount) return baseWeapon; // No magic if Common

    let magicEffects = [];
    let possibleEffects = deepCopy(AllowedMagicEffects[baseWeapon.type] || []);

    while (magicEffects.length < rarity.magicCount && possibleEffects.length > 0) {
        const effectIndex = getRandomIndex(possibleEffects);
        magicEffects.push(possibleEffects.splice(effectIndex, 1)[0]); // Remove to prevent duplicates
    }

    return {
        ...baseWeapon,
        baseDamage: Math.floor(baseWeapon.baseDamage * rarity.baseMultiplier),
        rarity: rarity.name,
        magicalEffects: magicEffects
    };
};

const generateItem = (category, options = {}) => {
    switch (category) {
        case ItemCategories.ACCESSORY:
            return generateAccessory(options);
        case ItemCategories.ARMOR:
            return generateArmor(options);
        case ItemCategories.CONSUMABLE:
            return generateConsumable(options);
        case ItemCategories.WEAPON:
            return generateWeapon(options);
        default:
            throw new Error(`Unsupported item category: ${category}`);
    }
};

export {
    generateItem,
    generateWeapon
};