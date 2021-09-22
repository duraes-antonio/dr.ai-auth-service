import {
    IUpdateUserCase,
    UpdateUserInput,
} from '../../../../core/modules/user/core/use-cases/update-user';
import { StatusCodes } from 'http-status-codes';
import { BaseController, ControllerSuccessResponse } from '../base.controller';
import { inject, injectable } from 'inversify';
import { USE_CASE_TYPES } from '../../../config/dependency-injection/inversify/di-types';

@injectable()
export class UpdateUserController extends BaseController<
    UpdateUserInput,
    void
> {
    constructor(
        @inject(USE_CASE_TYPES.IUpdateUserCase)
        private readonly updateUseCase: IUpdateUserCase
    ) {
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
