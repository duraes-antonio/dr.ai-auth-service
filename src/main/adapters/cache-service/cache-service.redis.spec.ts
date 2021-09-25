import { CacheServiceRedis } from './cache-service.redis';
import {
    cacheStoredValue,
    ioRedisMock,
} from '../../../__mocks__/infra/io-redis.mock';

const driverRedis = ioRedisMock;
const service = new CacheServiceRedis(driverRedis);

it('should call Redis driver method to store the value', () => {
    const expectedKey = 'key';
    const expectedValue = { name: 'Name' };

    service.set(expectedKey, expectedValue);

    expect(driverRedis.set).toHaveBeenCalledTimes(1);
    expect(driverRedis.set).toHaveBeenCalledWith(
        expectedKey,
        JSON.stringify(expectedValue)
    );
});

it('should call Redis driver method to retrieves stored value', async () => {
    jest.spyOn(driverRedis, 'get');

    const value = await service.get(cacheStoredValue.key);

    expect(driverRedis.get).toHaveBeenCalledTimes(1);
    expect(value).toEqual(cacheStoredValue);
});
