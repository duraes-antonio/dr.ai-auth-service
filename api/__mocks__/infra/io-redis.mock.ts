import { mockDeep } from 'jest-mock-extended';
import IORedis from 'ioredis';

export const cacheStoredValue = {
    key: 'key',
    value: 'value',
};

export function factoryIoRedis(): IORedis.Redis {
    return mockDeep<IORedis.Redis>({
        // @ts-ignore
        get(key: IORedis.KeyType, callback: IORedis.Callback<string | null>) {
            if (key === cacheStoredValue.key) {
                return Promise.resolve(JSON.stringify(cacheStoredValue));
            }
        },
    });
}
