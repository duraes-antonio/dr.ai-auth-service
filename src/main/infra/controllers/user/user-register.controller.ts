import {
    AddUserInput,
    IRegisterUserCase,
    UserLogged,
} from '../../../../core/modules/user/core/use-cases/register-user';
import { BaseController, ControllerSuccessResponse } from '../base.controller';
import { StatusCodes } from 'http-status-codes';

export class RegisterUserController extends BaseController<
    AddUserInput,
    UserLogged
> {
    constructor(private readonly registerCase: IRegisterUserCase) {
        super();
    }

    protected async handleRequest(
        input: AddUserInput
    ): Promise<ControllerSuccessResponse<UserLogged>> {
        const result = await this.registerCase.execute(input);
        return {
            code: StatusCodes.CREATED,
            result,
        };
    }
}
