import { PrismaClient } from '@prisma/client';
import {
    IFindUserByEmail,
    IPersistUser,
    IUpdateUser,
    UserForUpdate,
} from '../../../../core/modules/user/core/repositories/user.repository';
import { AddUserInput } from '../../../../core/modules/user/core/use-cases/register-user';
import { injectable } from 'inversify';
import { User } from '../../../../core/modules/user/core/entities/user.model';

const { user: userPrismaSchema } = new PrismaClient();

@injectable()
export class UserRepositoryPostgresql
    implements IFindUserByEmail, IPersistUser, IUpdateUser
{
    async findByEmail(email: string): Promise<User | undefined> {
        const userDto = (await userPrismaSchema.findUnique({
            where: { email },
            select: {
                email: true,
                id: true,
                imageUrl: true,
                name: true,
                password: false,
            },
        })) as User | null;
        return userDto ?? undefined;
    }

    async persist(user: AddUserInput): Promise<number> {
        const userCreated = await userPrismaSchema.create({ data: user });
        return userCreated.id;
    }

    async update(user: UserForUpdate): Promise<void> {
        const { id, imageUrl, name } = user;
        await userPrismaSchema.update({
            data: { imageUrl, name },
            where: { id },
        });
    }
}
