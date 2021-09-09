interface FormatError {
    message: string;
}

type ValidatorOutput = FormatError[] | undefined;

interface Validatable<Input> {
    readonly valid: boolean;

    validate(value: Input): ValidatorOutput;
}

type Validator<Input> = (input: Input) => ValidatorOutput;

export { Validator, Validatable, ValidatorOutput, FormatError };
