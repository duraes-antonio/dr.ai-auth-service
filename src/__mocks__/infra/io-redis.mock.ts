import { mockDeep } from 'jest-mock-extended';
import IORedis from 'ioredis';
import { when } from 'jest-when';

export const cacheStoredValue = {
    key: 'key',
    value: 'value',
};

export function ioRedisFactory(): IORedis.Redis {
    const ioRedisMock = mockDeep<IORedis.Redis>();

    when(ioRedisMock.get)
        // @ts-ignore
        .calledWith(cacheStoredValue.key)
        .mockImplementation(() =>
            Promise.resolve(JSON.stringify(cacheStoredValue))
        );
    return ioRedisMock;
}
