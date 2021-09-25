import 'reflect-metadata';
import { UserRepositoryMongodb } from './user-repository.mongodb';
import { getContainerDI } from '../../../../config/dependency-injection/inversify/containers/di-container';
import { PrismaClientProvider } from '../../../../config/dependency-injection/inversify/providers';
import { INFRA_TYPES } from '../../../../config/dependency-injection/inversify/di-types';
import { PrismaClient } from '@prisma/client';
import { AddUserInput } from '../../../../../core/modules/user/core/use-cases/register-user';
import { UserForUpdate } from '../../../../../core/modules/user/core/repositories/user.repository';

const containerDI = getContainerDI();
const prismaProvider = containerDI.get<PrismaClientProvider>(
    INFRA_TYPES.PrismaClientProvider
);
const repository = new UserRepositoryMongodb(prismaProvider);
let prisma: PrismaClient;

beforeAll(async () => (prisma = await prismaProvider()));

it('should call prisma findUnique with correct args', async () => {
    const email = 'test@email.com';
    const findOptions = {
        where: { email },
        select: {
            email: true,
            id: true,
            imageUrl: true,
            name: true,
            password: false,
        },
    };
    jest.spyOn(prisma.user, 'findUnique');

    await repository.findByEmail(email);

    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith(findOptions);
});

it('should call prisma create method with right data', async () => {
    const inputData: AddUserInput = {
        password: 'pass',
        email: 'email@email.com',
        name: 'User Name',
    };
    jest.spyOn(prisma.user, 'create');

    await repository.persist(inputData);

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: inputData });
});

it('should call prisma update method with right data', async () => {
    const data = {
        name: 'User Name',
        imageUrl: undefined,
    };
    const inputData: UserForUpdate = { ...data, id: 'fake-id' };
    const expectedArgsPrisma = {
        data,
        where: { id: inputData.id },
    };
    jest.spyOn(prisma.user, 'update');

    await repository.update(inputData);

    expect(prisma.user.update).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith(expectedArgsPrisma);
});
