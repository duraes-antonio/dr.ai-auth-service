import 'reflect-metadata';
import { Container } from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { TYPES } from '../di-types';
import { UserRepositoryMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { HashManager } from '../../../../../core/ports/hash-manager/hash-manager';
import { HashManagerMock } from '../../../../../__mocks__/adapters/hash-manager/hash-manager.mock';

export const containerDITest = new Container();

containerDITest.bind<PersistUser>(TYPES.PersistUser).to(UserRepositoryMock);
containerDITest
    .bind<FindUserByEmail>(TYPES.FindUserByEmail)
    .to(UserRepositoryMock);
containerDITest.bind<UpdateUser>(TYPES.UpdateUser).to(UserRepositoryMock);
containerDITest.bind<HashManager>(TYPES.HashManager).to(HashManagerMock);
