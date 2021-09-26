import { EnvironmentType } from './environment-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRESQL_URI: string;
            POSTGRESQL_URI_PROD: string;

            MONGO_URI: string;
            MONGO_URI_PROD: string;

            REDIS_PORT: number;
            REDIS_HOST: string;
            REDIS_PASSWORD: string;

            NODE_ENV: EnvironmentType;
            PORT?: string;
        }
    }
}
