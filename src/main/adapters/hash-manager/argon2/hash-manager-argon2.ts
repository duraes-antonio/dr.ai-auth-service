import argon2 from 'argon2';
import {
    HashManager,
    HashManagerOptions,
} from '../../../../core/ports/hash-manager/hash-manager';
import { injectable } from 'inversify';

@injectable()
export class HashManagerArgon2 implements HashManager {
    compare(
        hash: string,
        plain: string,
        options?: HashManagerOptions
    ): Promise<boolean> {
        return argon2.verify(hash, plain, options);
    }

    generate(plain: string, options?: HashManagerOptions): Promise<string> {
        return argon2.hash(plain, options);
    }
}
