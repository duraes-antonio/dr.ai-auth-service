import { StatusCodes } from 'http-status-codes';

type DefaultErrorInput = {
    code?: StatusCodes;
    message: string;
};

class DefaultError extends Error {
    readonly code = StatusCodes.INTERNAL_SERVER_ERROR;
    readonly message =
        'Oops! An unexpected error has occurred. Please try again in a few minutes.';

    constructor(input: DefaultErrorInput) {
        super(input.message);
        Object.assign(this, input);
    }
}

export { DefaultErrorInput, DefaultError };
