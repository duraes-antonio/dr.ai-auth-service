import { Validator } from '../validation';

export type EmailValidatorInput = {
    value: string;
    maxLength?: number;
};

export interface EmailValidator extends Validator<EmailValidatorInput> {}
