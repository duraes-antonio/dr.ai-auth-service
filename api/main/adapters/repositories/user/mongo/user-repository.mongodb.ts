import {
    FindUserByEmail,
    PersistUser,
    UpdateUser,
    UserForUpdate,
} from '../../../../../core/modules/user/core/repositories/user.repository';
import { AddUserInput } from '../../../../../core/modules/user/core/use-cases/register-user';
import { inject, injectable } from 'inversify';
import { User } from '../../../../../core/modules/user/core/entities/user.model';
import { EntityId } from '../../../../../core/entities/entity';
import { PrismaClientProvider } from '../../../../config/dependency-injection/inversify/providers/providers';
import { INFRA_TYPES } from '../../../../config/dependency-injection/inversify/di-types';
import { PrismaClient } from '@prisma/client';

@injectable()
export class UserRepositoryMongodb
    implements FindUserByEmail, PersistUser, UpdateUser
{
    private prismaClient!: PrismaClient;

    constructor(
        @inject(INFRA_TYPES.PrismaClientProvider)
        private readonly prismaProvider: PrismaClientProvider
    ) {
        prismaProvider().then((prisma) => (this.prismaClient = prisma));
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const userDto = (await this.prismaClient.user.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                imageUrl: true,
                name: true,
                password: false,
            },
        })) as unknown as User | null;
        return userDto ?? undefined;
    }

    async persist(user: AddUserInput): Promise<EntityId> {
        const userCreated = await this.prismaClient.user.create({ data: user });
        return userCreated.id;
    }

    async update(user: UserForUpdate): Promise<void> {
        const { id, imageUrl, name } = user;
        await this.prismaClient.user.update({
            data: { imageUrl, name },
            where: { id },
        });
    }
}
