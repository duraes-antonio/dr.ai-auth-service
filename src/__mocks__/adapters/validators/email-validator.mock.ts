import {
    EmailValidator,
    EmailValidatorInput,
} from '../../../core/ports/validation/validators/email.validator';
import { ValidatorOutput } from '../../../core/ports/validation/validation';
import { injectable } from 'inversify';
import { It, Mock } from 'moq.ts';
import { InvalidEmail } from '../../../core/errors/invalid-format';

export const validEmail = 'email@email.com';
export const notExistentUserValidEmailMock = 'email2@email.com';
export const validEmails = [validEmail, notExistentUserValidEmailMock];

const emailValidatorMock = new Mock<EmailValidator>()
    .setup((instance) =>
        instance.validate(
            It.Is<EmailValidatorInput>((v) => !validEmails.includes(v.value))
        )
    )
    .returns([new InvalidEmail()]);

@injectable()
export class EmailValidatorMock implements EmailValidator {
    validate(input: EmailValidatorInput): ValidatorOutput {
        return emailValidatorMock.object().validate(input);
    }
}
