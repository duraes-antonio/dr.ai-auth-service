import { factoryMessageError } from './error-message.factory';
import { FormatError } from '../contracts/validation/validation';
import { DefaultError } from './default';
import { StatusCodes } from 'http-status-codes';

export type FactoryMessageBadFormat = (
    attributeName: string,
    example?: string
) => string;

export class InvalidFormatError extends DefaultError implements FormatError {
    constructor(
        attributeName: string,
        example?: string,
        factoryMessage: FactoryMessageBadFormat = factoryMessageError.invalidFormat
    ) {
        super({
            message: factoryMessage(attributeName, example),
            code: StatusCodes.BAD_REQUEST,
        });
    }
}

export class InvalidEmail extends InvalidFormatError {
    constructor(
        factoryMessage: FactoryMessageBadFormat = factoryMessageError.invalidFormat
    ) {
        super(factoryMessage('email', 'maria@email.com'));
    }
}
