import 'reflect-metadata';
import { EmailAddress } from './email';
import {
    EmailValidator,
    EmailValidatorInput,
} from '../../ports/validation/validators/email.validator';
import { TYPES } from '../../../main/config/dependency-injection/inversify/di-types';
import { validEmail } from '../../../__mocks__/adapters/validators/email-validator.mock';
import { getContainerDI } from '../../../main/config/dependency-injection/inversify/containers/di-container';

const container = getContainerDI();
const emailValidator = container.get<EmailValidator>(TYPES.EmailValidator);

beforeAll(() => jest.spyOn(emailValidator, 'validate'));

it('should call validator when initialize', function () {
    const expectedInput: EmailValidatorInput = {
        value: validEmail,
        maxLength: 32,
    };
    const emailAddress = new EmailAddress(
        emailValidator,
        expectedInput.value,
        expectedInput.maxLength
    );
    expect(emailValidator.validate).toBeCalledWith(expectedInput);
    expect(emailValidator.validate).toBeCalledTimes(1);
    expect(emailAddress.valid).toBe(true);
});
