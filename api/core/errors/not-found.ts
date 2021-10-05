import { DefaultError } from './default';
import { StatusCodes } from 'http-status-codes';
import { factoryMessageError } from './error-message.factory';

export type FactoryMessageNotFoundError = (entityName?: string) => string;

export class NotFoundError extends DefaultError {
    constructor(
        entityName?: string,
        factoryError: FactoryMessageNotFoundError = factoryMessageError.notFound
    ) {
        super({
            code: StatusCodes.NOT_FOUND,
            message: factoryError(entityName),
        });
    }
}
