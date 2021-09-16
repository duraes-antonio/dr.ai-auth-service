import { IUseCase } from '../../../../contracts/use-case';

export type LoginCredentialsInput = {
    username: string;
    password: string;
};

export interface ILoginCredentialsCase
    extends IUseCase<LoginCredentialsInput, string> {}
