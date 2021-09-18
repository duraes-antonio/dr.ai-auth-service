import { User } from '../entities/user.model';
import { AddUserInput } from '../use-cases/register-user';
import { Entity } from '../../../../entities/entity';

export interface UserForUpdate extends Entity {
    imageUrl?: string;
    name?: string;
}

export type FindUserByEmail = (email: string) => Promise<User | undefined>;

export type PersistUser = (user: AddUserInput) => Promise<number>;

export type UpdateUser = (user: UserForUpdate) => Promise<void>;

export interface IFindUserByEmail {
    find(email: string): Promise<User | undefined>;
}

export interface IPersistUser {
    persist(user: AddUserInput): Promise<number>;
}

export interface IUpdateUser {
    update(user: UserForUpdate): Promise<void>;
}
