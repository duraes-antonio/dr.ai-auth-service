import { UseCase } from '../../../../../core/contracts/use-cases/use-case';

type AddUserInput = {
    name: string;
    email: string;
    password: string;
    image?: File;
};

type AddUserOutput = {
    token: string;
};

type RegisterUser = UseCase<AddUserInput, void>;

export interface IRegisterUser {
    execute: RegisterUser;
}

export { AddUserInput, AddUserOutput, RegisterUser };
