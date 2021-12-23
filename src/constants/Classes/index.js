const firstUpper = str => str.charAt(0).toUpperCase() + str.slice(1);

const characterClass = (key, npcAllowed = true, playerAllowed = false, unlockCondition = null) => ({
    key,
    name: firstUpper(key.toLowerCase()),
    npcAllowed,
    playerAllowed,
    unlockCondition,
    unlockRequired: unlockCondition !== null
});

const bothClassBase = (key, unlockCondition = null) => characterClass(key, true, true, unlockCondition);
const npcClassBase = (key, unlockCondition = null) => characterClass(key, true, false, unlockCondition);
const playerClassBase = (key, unlockCondition = null) => characterClass(key, false, true, unlockCondition);

const bothClass = key => bothClassBase(key);
const lockedBothClass = (key, condition) => bothClassBase(key, condition);

const npcClass = key => npcClassBase(key);
const lockedNpcClass = (key, condition) => npcClassBase(key, condition);

const playerClass = key => playerClassBase(key);
const lockedPlayerClass = (key, condition) => playerClassBase(key, condition);

const MEDIUM = playerClass('MEDIUM');
const SUMMONER = playerClass('SUMMONER');
const THAUMATURGIST = playerClass('THAUMATURGIST');

const Classes = {
    MEDIUM,
    SUMMONER,
    THAUMATURGIST
};

export default Classes;