import { updateCharacter, updateCharacters } from "./updateCharacters";

export const applyEffects = (context, targets, updates) => {
    const { player, allies, enemies } = context;
    const descriptions = [];

    // Group targets by type (player, allies, enemies)
    const groupedUpdates = Object.groupBy(targets, target =>
        target.id === player.id ? "player" :
        allies.some(a => a.id === target.id) ? "allies" : "enemies"
    );

    const playerUpdate = updates[player.id];
    if (playerUpdate) {
        descriptions.push(playerUpdate.description);
    }

    // Build update objects while collecting descriptions
    const extractUpdates = (group) => group?.reduce((acc, current) => {
        const { id } = current;

        if (updates[id]) {
            descriptions.push(updates[id].description);
            acc[id] = updates[id].updatedAttributes;
        }
        return acc;
    }, {}) || {};

    const allyUpdates = extractUpdates(groupedUpdates.allies);
    const enemyUpdates = extractUpdates(groupedUpdates.enemies);

    return {
        player: updateCharacter(player, playerUpdate?.updatedAttributes),
        allies: updateCharacters(allies, allyUpdates),
        enemies: updateCharacters(enemies, enemyUpdates),
        descriptions
    };
};