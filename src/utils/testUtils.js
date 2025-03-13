import { expect } from '@jest/globals';

const expectHasNoProperties = (obj, properties) => {
    properties.forEach(prop => {
        expect(obj).not.toHaveProperty(prop, `Unexpected property found: ${prop}`);
    })
};

export { expectHasNoProperties };