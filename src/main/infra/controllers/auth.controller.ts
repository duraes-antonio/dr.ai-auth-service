import {
    ILoginCredentialsCase,
    LoginCredentialsInput,
} from '../../../core/modules/auth/core/use-cases/login';
import { ILogoutCase } from '../../../core/modules/auth/core/use-cases/logout';
import { UserLogged } from '../../../core/modules/user/core/use-cases/register-user';

export class AuthController {
    constructor(
        private readonly loginCase: ILoginCredentialsCase,
        private readonly logoutCase: ILogoutCase
    ) {}

    login(input: LoginCredentialsInput): Promise<UserLogged> {
        return this.loginCase.execute(input);
    }

    logout(currentToken: string): Promise<void> {
        return this.logoutCase.execute(currentToken);
    }
}
