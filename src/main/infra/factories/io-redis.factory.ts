import IORedis from 'ioredis';

export function ioRedisFactory(): IORedis.Redis {
    return new IORedis({
        port: +(process.env.REDIS_PORT as unknown as number),
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    });
}
