import { StatusCodes } from 'http-status-codes';
import { DefaultError } from './default';

const code = StatusCodes.INTERNAL_SERVER_ERROR;
const message =
    'Oops! An unexpected error has occurred. Please try again in a few minutes.';

export class UnknownError extends DefaultError {
    constructor() {
        super({ message, code });
    }
}
