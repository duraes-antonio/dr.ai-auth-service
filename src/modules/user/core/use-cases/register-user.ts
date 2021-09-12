import { UseCase } from '../../../../core/contracts/use-cases/use-case';
import { User } from '../entities/user.model';

export type AddUserInput = {
    name: string;
    email: string;
    password: string;
    image?: File;
};

export type AddUserOutput = {
    token: string;
};

export type RegisterUserType = UseCase<AddUserInput, User>;

export interface IRegisterUserCase {
    execute: RegisterUserType;
}
