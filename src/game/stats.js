import { HealingTypes } from "./constants";

const HealingStats = [ "medicine", "magicPower" ];

const HealingStatsByHealingType = {    
    [HealingTypes.MEDICINE]: "medicine",
    [HealingTypes.MAGIC]: "magicPower"
};

const getHealingStat = (healingType) => {
    const byType = HealingStatsByHealingType[healingType];

    if (!byType) {
        console.warn(`Unknown healing type ${healingType}, defaults to medicine`);
        return "medicine";
    }

    return byType;
    

};

export { getHealingStat };