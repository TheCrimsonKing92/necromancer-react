const StatusTypes = {
    BUFF_ATTACK: "buff_attack",
    BUFF_DEFENSE: "buff_defense",
    BLEED: "bleed",
    BURN: "burn",
    FREEZE: "freeze",
    POISON: "poison",
    STUN: "stun"
};

const StatusDefinitions = {
    [StatusTypes.BUFF_ATTACK]: {
        stackable: false
    },
    [StatusTypes.BUFF_DEFENSE]: {
        stackable: false
    },
    [StatusTypes.BLEED]: {
        stackable: true
    },
    [StatusTypes.BURN]: {
        // Reconsider
        stackable: false
    },
    [StatusTypes.FREEZE]: {
        stackable: false
    },
    [StatusTypes.POISON]: {
        stackable: true
    },
    [StatusTypes.STUN]: {
        stackable: false
    }
};

const ValidStatusTypes = new Set(Object.values(StatusTypes));

export { StatusDefinitions, StatusTypes, ValidStatusTypes };