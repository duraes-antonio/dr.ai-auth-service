import 'reflect-metadata';
import { Container } from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { UserRepositoryPostgresql } from '../../../../adapters/repositories/user/user-repository.postgresql';
import { TYPES } from '../di-types';

export const containerDIProd = new Container();

containerDIProd
    .bind<PersistUser>(TYPES.PersistUser)
    .to(UserRepositoryPostgresql);
containerDIProd
    .bind<FindUserByEmail>(TYPES.FindUserByEmail)
    .to(UserRepositoryPostgresql);
containerDIProd.bind<UpdateUser>(TYPES.UpdateUser).to(UserRepositoryPostgresql);
