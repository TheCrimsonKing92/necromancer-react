import Classes from "../Classes";

let skillIdCounter = 0;
let treeIdCounter = 0;

const skillTree = (name) => {
    const tree = {
        name,
        friendlyName: name.split('_').join(' '),
        id: treeIdCounter++
    };

    if (skillIdCounter !== 0) {
        skillIdCounter = 0;
    }

    return tree;
};

const skill = (tree, name) => {
    const skill = {
        id: skillIdCounter++,
        tree,
        name
    };

    return skill;
};

const ALL_SKILLS = [];
const SKILL_TREES = {
    MEDIUM: {
        COMBAT: skillTree('MEDIUM_COMBAT'),
        UTILITY: skillTree('MEDIUM_UTILITY')
    },
    NECROMANCER: {
        COMBAT: skillTree('NECROMANCER_COMBAT'),
        UTILITY: skillTree('NECROMANCER_UTILITY')
    },
    SUMMONER: {
        COMBAT: skillTree('SUMMONER_COMBAT'),
        UTILITY: skillTree('SUMMONER_UTILITY')
    },
    THAUMATURGIST: {
        COMBAT: skillTree('THAUMATURGIST_COMBAT'),
        UTILITY: skillTree('THAUMATURGIST_UTILITY')
    }
};

const getClassTrees = theClass => {
    return {
        [theClass.key]: SKILL_TREES[theClass.key],
        NECROMANCER: SKILL_TREES.NECROMANCER
    }
};

const getLearnableSkills = (theClass, learnedSkills) => {
    /*
        TODO: Return skills that
            * Are in the character class's available trees
            * Are unlocked (preReqs are met)
            * Have not yet been learned by the character
    */

    // This gets the skill trees available to the class, but is not filtered
    // Need to add preReq information for unlocking purposes
    return getClassTrees(theClass);
};

const Skills = {
    ALL_SKILLS,
    SKILL_TREES,
    getClassTrees,
    getLearnableSkills
};

export default Skills;