import { CacheService } from '../../../core/ports/cache-service/cache-service';
import { inject, injectable } from 'inversify';
import { INFRA_TYPES } from '../../config/dependency-injection/inversify/di-types';
import { Redis } from 'ioredis';

@injectable()
export class CacheServiceRedis implements CacheService {
    constructor(
        @inject(INFRA_TYPES.IORedis)
        private readonly redisDriver: Redis
    ) {}

    async get<K extends string, V>(key: K): Promise<V | null> {
        const valueString = await this.redisDriver.get(key);
        return valueString ? JSON.parse(valueString) : null;
    }

    async set<K extends string, V>(key: K, value: V): Promise<void> {
        await this.redisDriver.set(key, JSON.stringify(value));
    }

    async remove<K extends string>(key: K): Promise<void> {
        await this.redisDriver.del(key);
    }
}
