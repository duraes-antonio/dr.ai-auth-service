import 'reflect-metadata';
import { Container } from 'inversify';
import { EnvironmentType } from '../../../environment/environment-types';
import { DIContainerFactory } from './di-container.factory';
import { getContainerTest } from './di-container-test';
import { getContainerProduction } from './di-container-prod';

const containersByEnv: { [key in EnvironmentType]: DIContainerFactory } = {
    [EnvironmentType.TEST]: getContainerTest,
    [EnvironmentType.PROD]: getContainerProduction,
    [EnvironmentType.DEV]: getContainerProduction,
};

export function getContainerDI(): Container {
    const env: EnvironmentType =
        <EnvironmentType>process?.env?.NODE_ENV ?? EnvironmentType.DEV;
    return containersByEnv[env]();
}
