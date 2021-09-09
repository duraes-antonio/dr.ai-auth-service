import { EmailAddress } from './email';
import {
    EmailValidator,
    EmailValidatorInput,
} from '../../contracts/validation/validators/email.validator';
import { factoryMessageError } from '../../errors/error-message.factory';
import { FormatError } from '../../contracts/validation/validation';

const emailValidatorMock = jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorMock.mockImplementation(({ maxLength, value }) => {
    if (value.length > maxLength) {
        return [
            {
                message: factoryMessageError.maxLength('email', maxLength),
            },
        ];
    }
});

describe('Email Model', function () {
    it('should call validator when initialize', function () {
        const expectedInput: EmailValidatorInput = {
            value: 'email@email.com',
            maxLength: 32,
        };
        const emailAddress = new EmailAddress(
            emailValidatorMock,
            expectedInput.value,
            expectedInput.maxLength
        );
        expect(emailAddress.valid).toBe(true);
        expect(emailValidatorMock).toBeCalledTimes(1);
        expect(emailValidatorMock).toBeCalledWith(expectedInput);
    });

    it('should return errors when call validate() with incorrect values', function () {
        // arrange
        const expectedInput: EmailValidatorInput = {
            value: 'a@a.c',
            maxLength: 2,
        };
        const emailAddress = new EmailAddress(
            emailValidatorMock,
            expectedInput.value,
            expectedInput.maxLength
        );
        const validateSpy = jest.spyOn(emailAddress, 'validate');

        // act
        const errors = emailAddress.validate(expectedInput.value);

        // asset
        expect(emailAddress.valid).toBe(false);
        expect(validateSpy).toBeCalledTimes(1);
        expect(errors).toEqual<FormatError[]>([
            {
                message: factoryMessageError.maxLength(
                    'email',
                    expectedInput.maxLength
                ),
            },
        ]);
    });
});
