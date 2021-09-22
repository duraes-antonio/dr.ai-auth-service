import 'reflect-metadata';
import {Container} from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import {UserRepositoryPostgresql} from '../../../../adapters/repositories/user/user-repository.postgresql';
import {TYPES, USE_CASE_TYPES} from '../di-types';
import {IRegisterUserCase} from '../../../../../core/modules/user/core/use-cases/register-user';
import {RegisterUserCase} from '../../../../../core/modules/user/use-cases/register-user/register-user';
import {IUpdateUserCase} from '../../../../../core/modules/user/core/use-cases/update-user';
import {UpdateUserCase} from '../../../../../core/modules/user/use-cases/update-user/update-user';
import {RegisterUserController} from '../../../../infra/controllers/user/user-register.controller';
import {EmailValidator} from '../../../../../core/ports/validation/validators/email.validator';
import {EmailValidatorMock} from '../../../../../__mocks__/adapters/validators/email-validator.mock';
import {HashManagerArgon2} from '../../../../adapters/hash-manager/argon2/hash-manager-argon2';
import {HashManager} from '../../../../../core/ports/hash-manager/hash-manager';
import {UpdateUserController} from '../../../../infra/controllers/user/user-update.controlller';

const containerDIProd = new Container();

// Adapters
containerDIProd
    .bind<EmailValidator>(TYPES.EmailValidator)
    .to(EmailValidatorMock);
containerDIProd.bind<HashManager>(TYPES.HashManager).to(HashManagerArgon2);

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

export { containerDIProd };
