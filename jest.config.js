export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
    },
    moduleFileExtensions: [ "ts", "tsx", "js", "jsx", "json", "node" ],
    transformIgnorePatterns: [ "node_modules/(?!(cliui|eslint-scope|eslint-visitor-keys|espree|flatted|get-package-type|nanoid|node-releases|ts-api-utils|vite|y18n|yargs|yargs-parser)/)" ],
    extensionsToTreatAsEsm: [".ts", ".tsx"]
};