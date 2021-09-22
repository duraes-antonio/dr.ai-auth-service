import { EnvironmentType } from './environment-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRESQL_URI: string;
            POSTGRESQL_URI_PROD: string;
            NODE_ENV: EnvironmentType;
            PORT?: string;
        }
    }
}
