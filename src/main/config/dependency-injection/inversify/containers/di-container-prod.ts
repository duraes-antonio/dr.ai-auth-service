import 'reflect-metadata';
import { Container } from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { UserRepositoryPostgresql } from '../../../../adapters/repositories/user/user-repository.postgresql';
import { TYPES, USE_CASE_TYPES } from '../di-types';
import { IRegisterUserCase } from '../../../../../core/modules/user/core/use-cases/register-user';
import { RegisterUserCase } from '../../../../../core/modules/user/use-cases/register-user/register-user';
import { IUpdateUserCase } from '../../../../../core/modules/user/core/use-cases/update-user';
import { UpdateUserCase } from '../../../../../core/modules/user/use-cases/update-user/update-user';
import { RegisterUserController } from '../../../../infra/controllers/user/user-register.controller';
import { UpdateUserController } from '../../../../infra/controllers/user/user-update.controller';

export const containerDIProd = new Container();

// Controllers
containerDIProd
    .bind<RegisterUserController>(RegisterUserController)
    .to(RegisterUserController);
containerDIProd
    .bind<UpdateUserController>(UpdateUserController)
    .to(UpdateUserController);

// Use cases
containerDIProd
    .bind<IRegisterUserCase>(USE_CASE_TYPES.IRegisterUserCase)
    .to(RegisterUserCase);
containerDIProd
    .bind<IUpdateUserCase>(USE_CASE_TYPES.IUpdateUserCase)
    .to(UpdateUserCase);

// Repositories
containerDIProd
    .bind<PersistUser>(TYPES.PersistUser)
    .to(UserRepositoryPostgresql);
containerDIProd
    .bind<FindUserByEmail>(TYPES.FindUserByEmail)
    .to(UserRepositoryPostgresql);
containerDIProd.bind<UpdateUser>(TYPES.UpdateUser).to(UserRepositoryPostgresql);
