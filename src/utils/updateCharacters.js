export const updateCharacter = (character, updates) => {
    if (!updates || Object.keys(updates).length === 0) {
        return character;
    }

    return {
        ...character,
        ...updates
    };
};

export const updateCharacters = (characters, updatesById) => {
    if (!updatesById || Object.keys(updatesById).length === 0) {
        return characters;
    }

    return characters.filter(character => updatesById[character.id]).map(character => updateCharacter(character, updatesById[character.id]));
};