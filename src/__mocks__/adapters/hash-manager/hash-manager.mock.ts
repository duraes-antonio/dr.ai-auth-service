import {
    HashManager,
    HashManagerOptions,
} from '../../../core/ports/hash-manager/hash-manager';
import { injectable } from 'inversify';

export const passwordHashedMock = 'password_hashed';

@injectable()
export class HashManagerMock implements HashManager {
    compare(
        hash: string,
        plain: string,
        options?: HashManagerOptions
    ): Promise<boolean> {
        return Promise.resolve(hash === plain);
    }

    generate(plain: string, options?: HashManagerOptions): Promise<string> {
        return Promise.resolve(passwordHashedMock);
    }
}
