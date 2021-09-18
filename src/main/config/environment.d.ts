import { EnvironmentType } from './environment-types';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRESQL_URI: string;
            NODE_ENV: EnvironmentType;
            PORT?: string;
        }
    }
}
