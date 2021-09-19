import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IFindUserByEmail,
    IPersistUser,
    IUpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { TYPES } from '../di-types';
import { UserRepositoryMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { HashManager } from '../../../../../core/ports/hash-manager/hash-manager';
import { HashManagerMock } from '../../../../../__mocks__/adapters/hash-manager/hash-manager.mock';

export const containerDITest = new Container();

containerDITest.bind<IPersistUser>(TYPES.IPersistUser).to(UserRepositoryMock);
containerDITest
    .bind<IFindUserByEmail>(TYPES.IFindUserByEmail)
    .to(UserRepositoryMock);
containerDITest.bind<IUpdateUser>(TYPES.IUpdateUser).to(UserRepositoryMock);
containerDITest.bind<HashManager>(TYPES.HashManager).to(HashManagerMock);
