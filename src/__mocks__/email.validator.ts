import { EmailValidator } from '../core/ports/validation/validators/email.validator';
import { InvalidEmail } from '../core/errors/invalid-format';

export const emailValidatorFailMock =
    jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorFailMock.mockImplementation(() => [new InvalidEmail()]);

export const emailValidatorMock =
    jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorMock.mockImplementation();
