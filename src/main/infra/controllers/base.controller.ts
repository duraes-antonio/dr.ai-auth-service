import { DefaultError } from '../../../core/errors/default';
import { StatusCodes } from 'http-status-codes';
import { UnknownError } from '../../../core/errors/unknown';

export interface ControllerSuccessResponse<T> {
    code: StatusCodes;
    result: T;
}

export interface ControllerErrorResponse {
    code: StatusCodes;
    errors: string[];
}

export type ControllerResponse<T> =
    | ControllerErrorResponse
    | ControllerSuccessResponse<T>;

export abstract class BaseController<TIn = unknown, TOut = unknown> {
    async handle(input: TIn): Promise<ControllerResponse<TOut>> {
        try {
            const { result, code } = await this.handleRequest(input);
            return {
                code,
                result,
                errors: [],
            };
        } catch (error) {
            const defaultError =
                error instanceof DefaultError ? error : new UnknownError();
            return {
                code: defaultError.code,
                result: undefined,
                errors: [defaultError.message],
            };
        }
    }

    protected abstract handleRequest(
        input: TIn
    ): Promise<ControllerSuccessResponse<TOut>>;
}
