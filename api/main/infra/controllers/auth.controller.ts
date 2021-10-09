import { ILoginCredentialsCase } from '../../../core/modules/auth/core/use-cases/login';
import { ILogoutCase } from '../../../core/modules/auth/core/use-cases/logout';
import { BaseController, ControllerSuccessResponse } from './base.controller';
import { UserLogged } from '../../../core/modules/user/core/use-cases/register-user';
import { StatusCodes } from 'http-status-codes';
import { SessionStore } from '../../../core/ports/session-storage/session-storage';
import { HttpRequest } from '../http/http.models';

// TODO: Incomplete
export class LoginController extends BaseController {
    constructor(
        private readonly loginCase: ILoginCredentialsCase,
        private readonly sessionManager: SessionStore
    ) {
        super();
    }

    protected async handleRequest(
        request: HttpRequest,
        input: unknown
    ): Promise<ControllerSuccessResponse<UserLogged>> {
        const result = await this.loginCase.execute({
            password: 'EMPTY',
            username: 'EMPTY',
        });
        return {
            code: StatusCodes.OK,
            result,
        };
    }
}

// TODO: Incomplete
export class LogoutController extends BaseController<string, void> {
    constructor(private readonly logoutCase: ILogoutCase) {
        super();
    }

    protected async handleRequest(
        request: HttpRequest,
        input: unknown
    ): Promise<ControllerSuccessResponse<void>> {
        const result = await this.logoutCase.execute('EMPTY');
        return {
            code: StatusCodes.OK,
            result,
        };
    }
}
