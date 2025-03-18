import { HealingTypes } from "./healing";

const Stats = {
    HEALTH: "health",
    MAX_HEALTH: "maxHealth",

    ATTACK: "attack",
    DEFENSE: "defense",

    MAGIC_DEFENSE: "magicDefense",
    MAGIC_POWER: "magicPower",

    MEDICINE: "medicine",

    STRENGTH: "strength",
    DEXTERITY: "dexterity",
    INTELLIGENCE: "intelligence"
};

const DEFAULT_STATS = {
    [Stats.HEALTH]: 10,
    [Stats.MAX_HEALTH]: 10,

    [Stats.ATTACK]: 0,
    [Stats.DEFENSE]: 0,

    [Stats.MAGIC_DEFENSE]: 0,
    [Stats.MAGIC_POWER]: 0,

    [Stats.MEDICINE]: 0,
    
    [Stats.STRENGTH]: 0,
    [Stats.DEXTERITY]: 0,
    [Stats.INTELLIGENCE]: 0
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
    DEFAULT_STATS,
    Stats,
    getHealingStat
};