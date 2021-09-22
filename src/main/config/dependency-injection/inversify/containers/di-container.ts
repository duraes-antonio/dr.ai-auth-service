import 'reflect-metadata';
import { Container } from 'inversify';
import { EnvironmentType } from '../../../environment/environment-types';
import { containerDITest } from './di-container-test';
import { containerDIProd } from './di-container-prod';

const containersByEnv: { [key in EnvironmentType]: Container } = {
    [EnvironmentType.TEST]: containerDITest,
    [EnvironmentType.PROD]: containerDIProd,
    [EnvironmentType.DEV]: containerDIProd,
};

export function getContainerDI(): Container {
    const env: EnvironmentType =
        <EnvironmentType>process?.env?.NODE_ENV ?? EnvironmentType.DEV;
    return containersByEnv[env];
}
