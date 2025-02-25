const Character = {
    init(id, name, team, health, attack, defense, magicPower, magicDefense) {
        this.id = id;
        this.name = name;
        this.team = team;

        this.health = health;
        this.maxHealth = health;

        this.attack = attack;
        this.defense = defense;
        this.magicPower = magicPower;
        this.magicDefense = magicDefense;

        this.statusEffects = [];

        return this;
    },

    hasStatus(statusType) {
        return this.statusEffects.some(status => status.name === statusType);
    },

    isAlive() {
        return this.health > 0;
    },
};

const Player = Object.create(Character);

Player.init = function(id, name, health, attack, defense, magicPower, magicDefense) {
    Character.init.call(
        this, id, name, "player", health, attack, defense, magicPower, magicDefense
    );

    this.inventory = [];
    this.skills = [];

    return this;
};

Player.addSkill = function(skill) { this.skills.push(skill); };
Player.addItem = function(item) { this.inventory.push(item); };

const Ally = Object.create(Character);

Ally.init = function(id, name, health, attack, defense, magicPower, magicDefense) {
    Character.init.call(
        this, id, name, "allies", health, attack, defense, magicPower, magicDefense
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

Enemy.init = function(id, name, attack, defense, magicPower, magicDefense) {
    Character.init.call(
        this, id, name, "enemies", health, attack, defense, magicPower, magicDefense
    );

    // TODO: Replace hardcoded default. Basic behaviors could be support, defense, aggressive
    this.behavior = "aggressive";

    return this;
};

Enemy.chooseAction = function() {
    return this.isAlive() ? "attack" : "none";
};