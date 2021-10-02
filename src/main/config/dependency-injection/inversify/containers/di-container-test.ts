import 'reflect-metadata';
import { Container } from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { INFRA_TYPES, TYPES, USE_CASE_TYPES } from '../di-types';
import { factoryUserRepositoryMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { HashManager } from '../../../../../core/ports/hash-manager/hash-manager';
import { HashManagerMock } from '../../../../../__mocks__/adapters/hash-manager/hash-manager.mock';
import { EmailValidator } from '../../../../../core/ports/validation/validators/email.validator';
import { EmailValidatorMock } from '../../../../../__mocks__/adapters/validators/email-validator.mock';
import { RegisterUserController } from '../../../../infra/controllers/user/user-register.controller';
import { IRegisterUserCase } from '../../../../../core/modules/user/core/use-cases/register-user';
import { IUpdateUserCase } from '../../../../../core/modules/user/core/use-cases/update-user';
import { RegisterUserCase } from '../../../../../core/modules/user/use-cases/register-user/register-user';
import { UpdateUserCase } from '../../../../../core/modules/user/use-cases/update-user/update-user';
import { FileStorage } from '../../../../../core/ports/file-storage/file-storage';
import { factoryFileStorageMock } from '../../../../../__mocks__/adapters/file/file-storage.mock';
import { UpdateUserController } from '../../../../infra/controllers/user/user-update.controlller';
import { PrismaClientProvider } from '../providers/providers';
import { PrismaClient } from '@prisma/client';
import { prismaMock } from '../../../../../__mocks__/infra/prisma-client.mock';
import IORedis from 'ioredis';
import { factoryIoRedis } from '../../../../../__mocks__/infra/io-redis.mock';
import { prismaClientProviderWrapper } from '../providers/prisma-client/prisma-client.provider';
import { CacheService } from '../../../../../core/ports/cache-service/cache-service';
import { CacheServiceRedis } from '../../../../adapters/cache-service/cache-service.redis';
import { DIContainerFactory } from './di-container.factory';

export const getContainerTest: DIContainerFactory = () => {
    const containerDITest = new Container();

    // External adapters
    containerDITest.bind<HashManager>(TYPES.HashManager).to(HashManagerMock);
    containerDITest
        .bind<EmailValidator>(TYPES.EmailValidator)
        .to(EmailValidatorMock);
    containerDITest
        .bind<FileStorage>(INFRA_TYPES.FileStorage)
        .toDynamicValue(factoryFileStorageMock);

    // Controllers
    containerDITest
        .bind<RegisterUserController>(RegisterUserController)
        .to(RegisterUserController);
    containerDITest
        .bind<UpdateUserController>(UpdateUserController)
        .to(UpdateUserController);

    // Use cases
    containerDITest
        .bind<IRegisterUserCase>(USE_CASE_TYPES.IRegisterUserCase)
        .to(RegisterUserCase);
    containerDITest
        .bind<IUpdateUserCase>(USE_CASE_TYPES.IUpdateUserCase)
        .to(UpdateUserCase);

    // Repositories
    containerDITest
        .bind<PersistUser>(TYPES.PersistUser)
        .toDynamicValue(factoryUserRepositoryMock);
    containerDITest
        .bind<FindUserByEmail>(TYPES.FindUserByEmail)
        .toDynamicValue(factoryUserRepositoryMock);
    containerDITest
        .bind<UpdateUser>(TYPES.UpdateUser)
        .toDynamicValue(factoryUserRepositoryMock);

    // Infra dependencies
    containerDITest
        .bind<CacheService>(INFRA_TYPES.CacheService)
        .to(CacheServiceRedis);
    containerDITest
        .bind<PrismaClient>(INFRA_TYPES.PrismaClient)
        .toConstantValue(prismaMock);
    containerDITest
        .bind<PrismaClientProvider>(INFRA_TYPES.PrismaClientProvider)
        .toProvider<PrismaClient>(prismaClientProviderWrapper);
    containerDITest
        .bind<IORedis.Redis>(INFRA_TYPES.IORedis)
        .toDynamicValue(factoryIoRedis);

    return containerDITest;
};
