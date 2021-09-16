import { HashManagerOptions } from '../../../../core/ports/hash-manager/hash-manager';
import { argon2HashManager } from './hash-manager-argon2';
import argon2 from 'argon2';

const plainText = 'password';
const hashed =
    '$argon2i$v=19$m=4096,t=3,p=1$bVlxM3Q2dzl5JEImRSlIQE1jUWZUalduWnI0dTd4IUE$ltFe2hZNWwwz1cSo9ysMyAqP/yizeowvVGvBPNn+Xu0';
const options: HashManagerOptions = {
    salt: Buffer.from('mYq3t6w9y$B&E)H@McQfTjWnZr4u7x!A'),
};

it('should call argon2 comparator with the parameters received, in the order passed', async () => {
    jest.spyOn(argon2, 'verify');
    const result = await argon2HashManager.comparator(
        hashed,
        plainText,
        options
    );
    expect(argon2.verify).toHaveBeenCalledTimes(1);
    expect(argon2.verify).toHaveBeenCalledWith(hashed, plainText, options);
    expect(result).toBe(true);
});

it('should call argon2 hash method with received parameters', async () => {
    const plainText = 'password';
    jest.spyOn(argon2, 'hash');
    const hashedPassword = await argon2HashManager.generator(
        plainText,
        options
    );
    expect(argon2.hash).toHaveBeenCalledTimes(1);
    expect(argon2.hash).toHaveBeenCalledWith(plainText, options);
    expect(hashedPassword).toBe(hashed);
});
