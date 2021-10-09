import 'reflect-metadata';
import { Container } from 'inversify';
import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { INFRA_TYPES, TYPES, USE_CASE_TYPES } from '../di-types';
import { IRegisterUserCase } from '../../../../../core/modules/user/core/use-cases/register-user';
import { RegisterUserCase } from '../../../../../core/modules/user/use-cases/register-user/register-user';
import { IUpdateUserCase } from '../../../../../core/modules/user/core/use-cases/update-user';
import { UpdateUserCase } from '../../../../../core/modules/user/use-cases/update-user/update-user';
import { RegisterUserController } from '../../../../infra/controllers/user/register/user-register.controller';
import { EmailValidator } from '../../../../../core/ports/validation/validators/email.validator';
import { EmailValidatorMock } from '../../../../../__mocks__/adapters/validators/email-validator.mock';
import { HashManagerArgon2 } from '../../../../adapters/hash-manager/argon2/hash-manager-argon2';
import { HashManager } from '../../../../../core/ports/hash-manager/hash-manager';
import { UpdateUserController } from '../../../../infra/controllers/user/user-update.controlller';
import { Server } from '../../../../infra/http/server';
import { ServerFastify } from '../../../../adapters/server/server.fastify';
import { FileStorage } from '../../../../../core/ports/file-storage/file-storage';
import { factoryFileStorageMock } from '../../../../../__mocks__/adapters/file/file-storage.mock';
import { UserRepositoryMongodb } from '../../../../adapters/repositories/user/mongo/user-repository.mongodb';
import { PrismaClient } from '@prisma/client';
import { PrismaClientProvider } from '../providers/providers';
import IORedis from 'ioredis';
import { ioRedisFactory } from '../../../../infra/factories/io-redis.factory';
import { CacheService } from '../../../../../core/ports/cache-service/cache-service';
import { CacheServiceRedis } from '../../../../adapters/cache-service/cache-service.redis';
import { prismaClientProviderWrapper } from '../providers/prisma-client/prisma-client.provider';
import { DIContainerFactory } from './di-container.factory';
import { SessionStore } from '../../../../../core/ports/session-storage/session-storage';
import { SessionStorageRedis } from '../../../../adapters/session-storage/redis/session-storage.redis';

export const getContainerProduction: DIContainerFactory = () => {
    const containerDIProd = new Container();

    // Adapters
    containerDIProd
        .bind<EmailValidator>(TYPES.EmailValidator)
        .to(EmailValidatorMock);
    containerDIProd
        .bind<FileStorage>(INFRA_TYPES.FileStorage)
        .toDynamicValue(factoryFileStorageMock);
    containerDIProd.bind<HashManager>(TYPES.HashManager).to(HashManagerArgon2);
    containerDIProd.bind<Server>(INFRA_TYPES.Server).to(ServerFastify);

    // Infra dependencies
    containerDIProd
        .bind<CacheService>(INFRA_TYPES.CacheService)
        .to(CacheServiceRedis);
    containerDIProd
        .bind<PrismaClient>(INFRA_TYPES.PrismaClient)
        .toConstantValue(new PrismaClient());
    containerDIProd
        .bind<PrismaClientProvider>(INFRA_TYPES.PrismaClientProvider)
        .toProvider<PrismaClient>(prismaClientProviderWrapper);
    containerDIProd
        .bind<IORedis.Redis>(INFRA_TYPES.IORedis)
        .toConstantValue(ioRedisFactory());
    containerDIProd
        .bind<SessionStore>(INFRA_TYPES.SessionStore)
        .to(SessionStorageRedis);

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
        .to(UserRepositoryMongodb);
    containerDIProd
        .bind<FindUserByEmail>(TYPES.FindUserByEmail)
        .to(UserRepositoryMongodb);
    containerDIProd
        .bind<UpdateUser>(TYPES.UpdateUser)
        .to(UserRepositoryMongodb);

    return containerDIProd;
};
