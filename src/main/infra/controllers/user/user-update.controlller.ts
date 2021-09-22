import {
    IUpdateUserCase,
    UpdateUserInput,
} from '../../../../core/modules/user/core/use-cases/update-user';
import { StatusCodes } from 'http-status-codes';
import { BaseController, ControllerSuccessResponse } from '../base.controller';

export class UpdateUserController extends BaseController<
    UpdateUserInput,
    void
> {
    constructor(private readonly updateUseCase: IUpdateUserCase) {
        super();
    }

    protected async handleRequest(
        input: UpdateUserInput
    ): Promise<ControllerSuccessResponse<void>> {
        const result = await this.updateUseCase.execute(input);
        return {
            code: StatusCodes.OK,
            result,
        };
    }
}
