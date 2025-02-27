const Character = {
    init({ id, name = 'Unnamed', team = 'Unaligned', health = 10, maxHealth = health, attack = 0, defense = 0, magicPower = 0, magicDefense = 0 }) {
        this.id = id;
        this.name = name;
        this.team = team;

        this.health = health;
        this.maxHealth = maxHealth;

        this.attack = attack;
        this.defense = defense;
        this.magicPower = magicPower;
        this.magicDefense = magicDefense;

        this.statusEffects = [];

        return this;
    },

    create(properties = {}) {
        return Object.create(this).init(properties);
    },

    hasStatus(statusType) {
        return this.statusEffects.some(status => status.name === statusType);
    },

    isAlive() {
        return this.health > 0;
    }
};

const Player = Object.create(Character);

Player.init = function({id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense}) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "player",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense
        }
    );

    this.inventory = [];
    this.skills = [];

    return this;
};

Player.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

Player.addSkill = function(skill) { this.skills.push(skill); };
Player.addItem = function(item) { this.inventory.push(item); };

const Ally = Object.create(Character);

Player.init = function({id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense}) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "allies",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense
        }
    );

    // TODO: Replace hardcoded default. Basic behaviors could be support, defense, aggressive
    this.behavior = "support";
    
    return this;
};

Ally.chooseAction = function() {
    // TODO: Replace placeholder logic
    return this.behavior === "support" ? "heal" : "attack";
};

const Enemy = Object.create(Character);

Enemy.init = function({id, name, health, maxHealth = health, attack, defense, magicPower, magicDefense}) {
    Character.init.call(
        this,
        {
            id,
            name,
            team: "enemies",
            health,
            maxHealth,
            attack,
            defense,
            magicPower,
            magicDefense
        }
    );

    // TODO: Replace hardcoded default. Basic behaviors could be support, defense, aggressive
    this.behavior = "aggressive";

    return this;
};

Enemy.create = function(properties = {}) {
    return Object.create(this).init(properties);
};

Enemy.chooseAction = function() {
    return this.isAlive() ? "attack" : "none";
};

export { Character, Ally, Enemy}