import { UseCase } from '../../../../contracts/use-cases/use-case';
import { User } from '../entities/user.model';

export type AddUserInput = {
    name: string;
    email: string;
    password: string;
    image?: File;
};

export type UserLogged = Pick<AddUserInput, 'name' | 'email'> &
    Pick<User, 'imageUrl' | 'id'>;

export type RegisterUserType = UseCase<AddUserInput, UserLogged>;

export interface IRegisterUserCase {
    execute: RegisterUserType;
}
