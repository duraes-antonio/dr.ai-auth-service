import 'reflect-metadata';
import { Container } from 'inversify';
import { containerDITest } from './di-container-test';
import { containerDIProd } from './di-container-prod';
import { EnvironmentType } from '../../../environment-types';

const containersByEnv: { [key in EnvironmentType]: Container } = {
    [EnvironmentType.TEST]: containerDITest,
    [EnvironmentType.PROD]: containerDIProd,
    [EnvironmentType.DEV]: containerDIProd,
};

export function getContainerDI(): Container {
    return containersByEnv[process.env.NODE_ENV];
}
