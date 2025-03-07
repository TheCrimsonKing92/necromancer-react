import { HealingTypes } from "./healing";

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

export { getHealingStat };