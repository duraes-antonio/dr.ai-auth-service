import { User } from '../entities/user.model';
import { AddUserInput } from '../use-cases/register-user';
import { Entity } from '../../../../entities/entity';

export interface UserForUpdate extends Entity {
    imageUrl?: string;
    name?: string;
}

export interface IFindUserByEmail {
    findByEmail(email: string): Promise<User | undefined>;
}

export interface IPersistUser {
    persist(user: AddUserInput): Promise<number>;
}

export interface IUpdateUser {
    update(user: UserForUpdate): Promise<void>;
}

export interface IUserRepository
    extends IFindUserByEmail,
        IPersistUser,
        IUpdateUser {}
