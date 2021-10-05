import { factoryMessageError } from './error-message.factory';
import { DefaultError } from './default';
import { StatusCodes } from 'http-status-codes';

type FactoryMessageConflictError = (
    entityName: string,
    attributeName: string
) => string;

class ConflictError extends DefaultError {
    constructor(
        entityName: string,
        attributeName: string,
        factoryMessage: FactoryMessageConflictError = factoryMessageError.conflict
    ) {
        super({
            message: factoryMessage(entityName, attributeName),
            code: StatusCodes.CONFLICT,
        });
    }
}

export { ConflictError, FactoryMessageConflictError };
