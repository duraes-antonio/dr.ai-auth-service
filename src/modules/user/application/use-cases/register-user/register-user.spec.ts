import { RegisterUserCase } from './register-user';
import { RequiredError } from '../../../../../core/errors/required';
import { AddUserInput } from '../../../core/use-cases/register-user';
import {
    InvalidEmail,
    InvalidFormatError,
} from '../../../../../core/errors/invalid-format';
import { EmailValidator } from '../../../../../core/contracts/validation/validators/email.validator';
import { ConflictError } from '../../../../../core/errors/conflict';
import {
    FindUserByEmail,
    PersistUser,
} from '../../../core/repositories/user.repository';
import { when } from 'jest-when';
import { EmailAddress } from '../../../../../core/value-objects/emai/email';
import { HashGenerator } from '../../../../../ports/hash-manager/hash-manager';
import { User } from '../../../core/entities/user.model';

const defaultInput: AddUserInput = {
    name: 'Maria Silva',
    password: 'password@123',
    email: 'maria@email.com',
};
const emptyString = [' \t \n', '', null, undefined];
const passwordHashedMock = 'password_hashed';
const userIdMock = 'id';

const emailValidatorFailMock = jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorFailMock.mockImplementation(() => [new InvalidEmail()]);

const emailValidatorMock = jest.fn() as jest.MockedFunction<EmailValidator>;

const findUserMock = jest.fn() as jest.MockedFunction<FindUserByEmail>;
when(findUserMock)
    .calledWith(defaultInput.email)
    .mockResolvedValue({
        id: userIdMock,
        email: new EmailAddress(emailValidatorMock, defaultInput.email),
        imageUrl: 'https://test.jpeg',
        name: defaultInput.name,
    });

const persistUserMock = jest.fn() as jest.MockedFunction<PersistUser>;
persistUserMock.mockResolvedValue(userIdMock);

const hashGeneratorMock = jest.fn() as jest.MockedFunction<HashGenerator>;
hashGeneratorMock.mockResolvedValue(passwordHashedMock);

const useCaseInstanceMailFail = new RegisterUserCase(
    emailValidatorFailMock,
    findUserMock,
    persistUserMock,
    hashGeneratorMock
);

const useCaseInstance = new RegisterUserCase(
    emailValidatorMock,
    findUserMock,
    persistUserMock,
    hashGeneratorMock
);

it('should throw an error if input is not received', async () => {
    await expect(useCaseInstance.execute(undefined)).rejects.toThrow(
        new RequiredError('input')
    );
});

it('should throw an error if user email is not received', async () => {
    const errorExpected = new RequiredError('email');
    const input: AddUserInput = { ...defaultInput, email: undefined };
    await expect(useCaseInstanceMailFail.execute(input)).rejects.toThrow(
        errorExpected
    );
});

it('should throw an error if user email is invalid', async () => {
    const errorExpected = new InvalidFormatError('email');
    const input: AddUserInput = { ...defaultInput, email: 'test' };
    await expect(useCaseInstanceMailFail.execute(input)).rejects.toThrow(
        errorExpected
    );
});

it.each(emptyString)(
    'should throw an error if password is not provided: %s',
    async (password) => {
        const errorExpected = new RequiredError('password');
        const input: AddUserInput = { ...defaultInput, password };
        await expect(useCaseInstance.execute(input)).rejects.toThrow(
            errorExpected
        );
    }
);

it('should throw an error if user email already exists', async () => {
    const errorExpected = new ConflictError('user', 'email');
    await expect(useCaseInstance.execute(defaultInput)).rejects.toThrow(
        errorExpected
    );
});

it('should generate a user data with hashed password', async () => {
    const newUser = { ...defaultInput, email: 'another@p.com' };
    await useCaseInstance.execute(newUser);
    expect(persistUserMock).toHaveBeenCalledTimes(1);
    expect(persistUserMock).toHaveBeenCalledWith({
        ...newUser,
        password: passwordHashedMock,
    });
});

it('should return a user data with user id', async () => {
    const userInput = { ...defaultInput, email: 'another@p.com' };
    const expectedUser = {
        ...defaultInput,
        id: userIdMock,
        email: new EmailAddress(emailValidatorMock, 'another@p.com'),
    };
    const userSaved = await useCaseInstance.execute(userInput);
    expect(userSaved).toEqual<User>(expectedUser);
});
