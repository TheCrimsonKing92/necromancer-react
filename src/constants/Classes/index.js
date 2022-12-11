const firstUpper = str => str.charAt(0).toUpperCase() + str.slice(1);

const characterClass = (key, description = "A class", npcAllowed = true, playerAllowed = false, unlockCondition = null) => ({
    key,
    description,
    name: firstUpper(key.toLowerCase()),
    npcAllowed,
    playerAllowed,
    unlockCondition,
    unlockRequired: unlockCondition !== null
});

const bothClassBase = (key, description, unlockCondition = null) => characterClass(key, description, true, true, unlockCondition);
const npcClassBase = (key, description, unlockCondition = null) => characterClass(key, description, true, false, unlockCondition);
const playerClassBase = (key, description, unlockCondition = null) => characterClass(key, description, false, true, unlockCondition);

const bothClass = (key, description) => bothClassBase(key, description);
const lockedBothClass = (key, description, condition) => bothClassBase(key, description, condition);

const npcClass = (key, description) => npcClassBase(key, description);
const lockedNpcClass = (key, description, condition) => npcClassBase(key, description, condition);

const playerClass = (key, description) => playerClassBase(key, description);
const lockedPlayerClass = (key, description, condition) => playerClassBase(key, description, condition);

const MEDIUM = playerClass('MEDIUM', 'A channeler of spirits, the Medium uses ritualistic possession to achieve higher powers and reveal hidden information.');
const SUMMONER = playerClass('SUMMONER', 'Summoners manifest spirits of the dead in the physical realm, raising unflinching soldiers.');
const THAUMATURGIST = playerClass('THAUMATURGIST', 'Shrouded in secrecy, a Thaumaturgist is one who uses exotic, morbid, ingredients to concoct an astounding array of magical items.');

const Classes = {
    MEDIUM,
    SUMMONER,
    THAUMATURGIST
};

export default Classes;