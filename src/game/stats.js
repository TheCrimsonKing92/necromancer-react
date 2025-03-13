import { HealingTypes } from "./healing";

const Stats = {
    ATTACK: "attack",
    DEFENSE: "defense",
    MAGIC_DEFENSE: "magicDefense",
    MAGIC_POWER: "magicPower",
    MEDICINE: "medicine",
    STRENGTH: "strength",
    DEXTERITY: "dexterity",
    INTELLIGENCE: "intelligence"
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

const getHealingStat = bindStats('healing', HealingStatsByHealingType, 'medicine');

export {
    Stats,
    getHealingStat
};