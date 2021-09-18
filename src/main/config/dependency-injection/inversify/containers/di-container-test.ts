import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IFindUserByEmail,
    IPersistUser,
    IUpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { TYPES } from '../di-types';
import { UserRepositoryMock } from '../../../../../__mocks__/repositories/user-repository.mock';

export const containerDITest = new Container();

containerDITest.bind<IPersistUser>(TYPES.IPersistUser).to(UserRepositoryMock);
containerDITest
    .bind<IFindUserByEmail>(TYPES.IFindUserByEmail)
    .to(UserRepositoryMock);
containerDITest.bind<IUpdateUser>(TYPES.IUpdateUser).to(UserRepositoryMock);
