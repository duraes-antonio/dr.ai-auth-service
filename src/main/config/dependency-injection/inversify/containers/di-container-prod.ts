import 'reflect-metadata';
import { Container } from 'inversify';
import {
    IFindUserByEmail,
    IPersistUser,
    IUpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { UserRepositoryPostgresql } from '../../../../adapters/repositories/user/user-repository.postgresql';
import { TYPES } from '../di-types';

export const containerDIProd = new Container();

containerDIProd
    .bind<IPersistUser>(TYPES.IPersistUser)
    .to(UserRepositoryPostgresql);
containerDIProd
    .bind<IFindUserByEmail>(TYPES.IFindUserByEmail)
    .to(UserRepositoryPostgresql);
containerDIProd
    .bind<IUpdateUser>(TYPES.IUpdateUser)
    .to(UserRepositoryPostgresql);
