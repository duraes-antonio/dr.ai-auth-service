import {
    HashComparator,
    HashGenerator,
} from '../../../../core/ports/hash-manager/hash-manager';
import argon2 from 'argon2';

const generator: HashGenerator = (plain, options) => {
    return argon2.hash(plain, options);
};

const comparator: HashComparator = async (hash, plain, options) => {
    return await argon2.verify(hash, plain, options);
};
export const argon2HashManager = {
    generator,
    comparator,
};
