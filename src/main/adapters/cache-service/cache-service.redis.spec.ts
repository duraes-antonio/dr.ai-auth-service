import 'reflect-metadata';
import { CacheServiceRedis } from './cache-service.redis';
import { cacheStoredValue } from '../../../__mocks__/infra/io-redis.mock';
import { getContainerDI } from '../../config/dependency-injection/inversify/containers/di-container';
import IORedis from 'ioredis';
import { INFRA_TYPES } from '../../config/dependency-injection/inversify/di-types';

const containerDI = getContainerDI();

function makeSut() {
    const driverRedis = containerDI.get<IORedis.Redis>(INFRA_TYPES.IORedis);
    return {
        driverRedis,
        service: new CacheServiceRedis(driverRedis),
    };
}

it('should call Redis driver method to store the value', () => {
    const expectedKey = 'key';
    const expectedValue = { name: 'Name' };
    const { service, driverRedis } = makeSut();
    jest.spyOn(driverRedis, 'set');

    service.set(expectedKey, expectedValue);

    expect(driverRedis.set).toHaveBeenCalledTimes(1);
    expect(driverRedis.set).toHaveBeenCalledWith(
        expectedKey,
        JSON.stringify(expectedValue)
    );
});

const getExpected: { key: string; value: unknown }[] = [
    {
        key: cacheStoredValue.key,
        value: cacheStoredValue,
    },
    {
        key: 'key-invalid',
        value: null,
    },
];

it.each(getExpected)(
    'should call Redis driver method to retrieves stored value (key: %s)',
    async ({ key, value }) => {
        const { service, driverRedis } = makeSut();

        jest.spyOn(driverRedis, 'get');
        const storedValue = await service.get(key);

        expect(driverRedis.get).toHaveBeenCalledTimes(1);
        expect(storedValue).toEqual(value);
    }
);
