import { StatusCodes } from 'http-status-codes';

type DefaultErrorInput = {
    code?: StatusCodes;
    message: string;
};

abstract class DefaultError extends Error {
    readonly code!: StatusCodes;
    readonly message!: string;

    constructor(input: DefaultErrorInput) {
        super(input.message);
        Object.assign(this, input);
        Object.setPrototypeOf(this, DefaultError.prototype);
    }
}

export { DefaultErrorInput, DefaultError };
