import { User } from '../entities/user.model';
import { AddUserInput } from '../use-cases/register-user';

type FindUserByEmail = (email: string) => Promise<User> | undefined;

type PersistUser = (user: AddUserInput) => Promise<void>;

export { FindUserByEmail, PersistUser };
