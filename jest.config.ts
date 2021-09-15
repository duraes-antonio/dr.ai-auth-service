import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
