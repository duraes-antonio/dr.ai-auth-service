import { IUseCase } from '../../../../contracts/use-cases/use-case';

export type LoginCredentialsInput = {
    username: string;
    password: string;
};

export interface ILoginCredentialsCase
    extends IUseCase<LoginCredentialsInput, string> {}
