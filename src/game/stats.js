import { HealingTypes } from "./constants";

const HealingStats = [ "medicine", "magicPower" ];

const HealingStatsByHealingType = {    
    [HealingTypes.MEDICINE]: "medicine",
    [HealingTypes.MAGIC]: "magicPower"
};

const getHealingStat = (healingType) => {
    const byType = HealingStatsByHealingType[healingType];

    if (byType) {
        return byType;
    }

    console.warn(`Unknown healing type ${healingType}, defaults to medicine`);
    return "medicine";
};

export { getHealingStat };