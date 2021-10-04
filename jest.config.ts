import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ['js', 'ts', 'tsx'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    injectGlobals: true,
    testEnvironment: 'node',
};

export default config;
