import { DamageTypes, HealingTypes } from "./constants";

const DamageStatsByDamageType = {
    [DamageTypes.PHYSICAL]: "attack",
    [DamageTypes.MAGICAL]: "magicPower"
};

const DefenseStatsByDamageType = {
    [DamageTypes.PHYSICAL]: "defense",
    [DamageTypes.MAGICAL]: "magicDefense"
};

const HealingStatsByHealingType = {    
    [HealingTypes.MEDICINE]: "medicine",
    [HealingTypes.MAGIC]: "magicPower"
};

const bindStats = (statType, stats, defaultStat) => {
    return (type) => {
        const byType = stats[type];

        if (byType) {
            return byType;
        }

        console.warn(`Unknown ${statType} type, defaults to ${defaultStat} stat`);
        return defaultStat;
    };
};

const getDamageStat = bindStats('damage', DamageStatsByDamageType, 'attack');
const getDefenseStat = bindStats('damage', DefenseStatsByDamageType, 'defense');
const getHealingStat = bindStats('healing', HealingStatsByHealingType, 'medicine');

export { getDamageStat, getDefenseStat, getHealingStat };