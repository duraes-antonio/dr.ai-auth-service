import { User } from '../entities/user.model';
import { AddUserInput } from '../use-cases/register-user';

export type UserForUpdate = {
    imageUrl?: string;
    name?: string;
};

export type FindUserByEmail = (email: string) => Promise<User | undefined>;

export type PersistUser = (user: AddUserInput) => Promise<string>;

export type UpdateUser = (user: UserForUpdate) => Promise<void>;
