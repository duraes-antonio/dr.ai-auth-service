export interface FormatError {
    message: string;
}

export type ValidatorOutput = FormatError[] | undefined;

export interface Validatable<Input> {
    readonly valid: boolean;

    validate(value: Input): ValidatorOutput;
}

export interface Validator<Input> {
    validate(input: Input): ValidatorOutput;
}
