import { Enemy, Player } from "./characters";

const generateUniqueId = () => Date.now().toString();

export function createPlayerInstance(data) {
    const id = generateUniqueId();
    
    return Player.create({
        id: generateUniqueId(),
        name: data.name,
        characterClass: data.characterClass,
        stats: { health: 20, maxHealth: 20, attack: 1, defense: 3, magicPower: 5 },
        ...data
    });
};

export function createThug({
    name = "Common Thug",
    level = 1
}) {
    const stats = {
        health: 15,
        maxHealth: 15,
        attack: 3,
        defense: 2
    };

    if (level > 1) {
        Object.keys(stats).forEach(stat => stats[stat] = Math.round(stats[stat] * Math.pow(1.2, level)));
    }
    
    console.log('Generated thug stats:', stats);

    return Enemy.create({
        id: 'enemy-' + generateUniqueId(),
        name,
        characterClass: 'Thug',
        stats,
        level
        // TODO: Default Thug inventory
    });
};