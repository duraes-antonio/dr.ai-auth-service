import {
    ILoginCredentialsCase,
    LoginCredentialsInput,
} from '../../../core/modules/auth/core/use-cases/login';
import { ILogoutCase } from '../../../core/modules/auth/core/use-cases/logout';
import { BaseController, ControllerSuccessResponse } from './base.controller';
import { UserLogged } from '../../../core/modules/user/core/use-cases/register-user';
import { StatusCodes } from 'http-status-codes';
import { SessionStore } from '../http/session';

export class LoginController extends BaseController {
    constructor(
        private readonly loginCase: ILoginCredentialsCase,
        private readonly sessionManager: SessionStore
    ) {
        super();
    }

    protected async handleRequest(
        input: LoginCredentialsInput
    ): Promise<ControllerSuccessResponse<UserLogged>> {
        const result = await this.loginCase.execute(input);
        return {
            code: StatusCodes.OK,
            result,
        };
    }
}

export class LogoutController extends BaseController<string, void> {
    constructor(private readonly logoutCase: ILogoutCase) {
        super();
    }

    protected async handleRequest(
        currentToken: string
    ): Promise<ControllerSuccessResponse<void>> {
        const result = await this.logoutCase.execute(currentToken);
        return {
            code: StatusCodes.OK,
            result,
        };
    }
}
