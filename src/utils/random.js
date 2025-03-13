const getRandomElement = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("getRandomElement called on an empty or non-array value");
    }

    return array[Math.floor(Math.random() * array.length)];
};

export { getRandomElement }