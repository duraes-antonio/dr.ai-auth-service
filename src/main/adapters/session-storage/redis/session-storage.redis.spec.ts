import 'reflect-metadata';
import IORedis from 'ioredis';
import { INFRA_TYPES } from '../../../config/dependency-injection/inversify/di-types';
import { SessionStorageRedis } from './session-storage.redis';
import { getContainerDI } from '../../../config/dependency-injection/inversify/containers/di-container';
import { UserSession } from '../../../../core/modules/user/core/entities/session.model';
import { cacheStoredValue } from '../../../../__mocks__/infra/io-redis.mock';

const containerDI = getContainerDI();
const expectedKey = 'key';
const expectedSession: UserSession = {
    sessionId: 'id',
    user: {
        email: 'email@email.com',
        id: 'id',
        name: 'Name',
    },
};

function makeSut(): {
    driverRedis: IORedis.Redis;
    service: SessionStorageRedis;
} {
    const driverRedis = containerDI.get<IORedis.Redis>(INFRA_TYPES.IORedis);
    return {
        driverRedis,
        service: new SessionStorageRedis(driverRedis),
    };
}

it('should call Redis driver method to store session', () => {
    const { service, driverRedis } = makeSut();
    jest.spyOn(driverRedis, 'set');

    service.set(expectedKey, expectedSession);

    expect(driverRedis.set).toHaveBeenCalledTimes(1);
    expect(driverRedis.set).toHaveBeenCalledWith(
        expectedKey,
        JSON.stringify(expectedSession)
    );
});

it('should call Redis driver method to retrieves stored session', async () => {
    const { service, driverRedis } = makeSut();

    jest.spyOn(driverRedis, 'get');
    const storedValue = await service.get(expectedKey);

    expect(driverRedis.get).toHaveBeenCalledTimes(1);
    expect(storedValue).toEqual(cacheStoredValue);
});

it('should call Redis driver method to remove stored value', async () => {
    const { service, driverRedis } = makeSut();

    jest.spyOn(driverRedis, 'del');
    await service.remove(expectedKey);

    expect(driverRedis.del).toHaveBeenCalledTimes(1);
    expect(driverRedis.del).toHaveBeenCalledWith(expectedKey);
});
