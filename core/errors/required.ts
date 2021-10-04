import { factoryMessageError } from './error-message.factory';
import { DefaultError } from './default';
import { StatusCodes } from 'http-status-codes';

export type FactoryMessageRequired = (attributeName: string) => string;

export class RequiredError extends DefaultError {
    constructor(
        attributeName: string,
        factoryMessage: FactoryMessageRequired = factoryMessageError.requiredField
    ) {
        super({
            message: factoryMessage(attributeName),
            code: StatusCodes.BAD_REQUEST,
        });
    }
}
