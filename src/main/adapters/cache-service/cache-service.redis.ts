import { CacheService } from '../../../core/ports/cache-service/cache-service';
import { Redis } from 'ioredis';

export class CacheServiceRedis implements CacheService {
    constructor(private readonly redisDriver: Redis) {}

    async get<K extends string, V>(key: K): Promise<V | null> {
        const valueString = await this.redisDriver.get(key);
        return valueString ? JSON.parse(valueString) : null;
    }

    async set<K extends string, V>(key: K, value: V): Promise<void> {
        await this.redisDriver.set(key, JSON.stringify(value));
    }
}
