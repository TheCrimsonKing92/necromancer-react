const getRandomElement = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("getRandomElement called on an empty or non-array value");
    }

    return array[getRandomIndex(array)];
};

const getRandomIndex = (array) => {
    return Math.floor(Math.random() * array.length);
};

const getRandomInRange = ([ min, max ]) => Math.floor(Math.random() * (max - min + 1)) + min;

export { getRandomElement, getRandomIndex, getRandomInRange };