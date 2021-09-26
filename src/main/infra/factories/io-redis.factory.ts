import IORedis from 'ioredis';
import Redis from 'ioredis';

export function ioRedisFactory(): IORedis.Redis {
    return new Redis({
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    });
}
