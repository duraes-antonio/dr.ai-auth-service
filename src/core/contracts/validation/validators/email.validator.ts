import { Validator } from '../validation';

type EmailValidatorInput = {
    value: string;
    maxLength?: number;
};

type EmailValidator = Validator<EmailValidatorInput>;

export { EmailValidator, EmailValidatorInput };
