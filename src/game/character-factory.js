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

export function createThug(name = "Common Thug") {
    return Enemy.create({
        id: 'enemy-' + generateUniqueId(),
        name,
        characterClass: 'Thug',
        stats: { health: 15, maxHealth: 15, attack: 3, defense: 2 }
        // TODO: Default Thug inventory
    })
};