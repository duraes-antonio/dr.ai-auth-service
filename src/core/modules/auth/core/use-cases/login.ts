import { IUseCase } from '../../../../contracts/use-case';
import { UserLogged } from '../../../user/core/use-cases/register-user';

export type LoginCredentialsInput = {
    username: string;
    password: string;
};

export interface ILoginCredentialsCase
    extends IUseCase<LoginCredentialsInput, UserLogged> {}
