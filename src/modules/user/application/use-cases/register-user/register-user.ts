import { UseCase } from '../../../../../core/contracts/use-cases/use-case';

interface AddUserInput {
    name: string;
    email: string;
    password: string;
    image: File;
}

interface AddUserOutput {
    token: string;
}

interface RegisterUser extends UseCase<AddUserInput, any> {}

export {};
