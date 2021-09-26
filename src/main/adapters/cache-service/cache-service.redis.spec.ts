import 'reflect-metadata';
import { CacheServiceRedis } from './cache-service.redis';
import { cacheStoredValue } from '../../../__mocks__/infra/io-redis.mock';
import { getContainerDI } from '../../config/dependency-injection/inversify/containers/di-container';
import IORedis from 'ioredis';
import { INFRA_TYPES } from '../../config/dependency-injection/inversify/di-types';

const containerDI = getContainerDI();
const driverRedis = containerDI.get<IORedis.Redis>(INFRA_TYPES.IORedis);
const service = new CacheServiceRedis(driverRedis);

it('should call Redis driver method to store the value', () => {
    const expectedKey = 'key';
    const expectedValue = { name: 'Name' };
    jest.spyOn(driverRedis, 'set');

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
