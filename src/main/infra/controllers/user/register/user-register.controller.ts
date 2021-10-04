import 'reflect-metadata';
import {
    AddUserInput,
    IRegisterUserCase,
    UserLogged,
} from '../../../../../core/modules/user/core/use-cases/register-user';
import {
    BaseController,
    ControllerSuccessResponse,
} from '../../base.controller';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import {
    INFRA_TYPES,
    USE_CASE_TYPES,
} from '../../../../config/dependency-injection/inversify/di-types';
import { HttpRequest } from '../../../http/http.models';
import { SessionStore } from '../../../../../core/ports/session-storage/session-storage';

@injectable()
export class RegisterUserController extends BaseController<
    AddUserInput,
    UserLogged
> {
    constructor(
        @inject(USE_CASE_TYPES.IRegisterUserCase)
        private readonly registerCase: IRegisterUserCase,
        @inject(INFRA_TYPES.SessionStore)
        private readonly sessionStore: SessionStore
    ) {
        super();
    }

    protected async handleRequest(
        request: HttpRequest,
        input: AddUserInput
    ): Promise<ControllerSuccessResponse<UserLogged>> {
        const result = await this.registerCase.execute(input);
        await this.sessionStore.set(request.session.sessionId, {
            sessionId: request.session.sessionId,
            user: {
                name: result.name,
                id: result.id,
                email: result.email,
            },
        });
        return {
            code: StatusCodes.CREATED,
            result,
        };
    }
}
