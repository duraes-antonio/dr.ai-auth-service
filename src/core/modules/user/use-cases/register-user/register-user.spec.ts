import { RegisterUserCase } from './register-user';
import { RequiredError } from '../../../../errors/required';
import { AddUserInput, UserLogged } from '../../core/use-cases/register-user';
import {
    InvalidEmail,
    InvalidFormatError,
} from '../../../../errors/invalid-format';
import { EmailValidator } from '../../../../contracts/validation/validators/email.validator';
import { ConflictError } from '../../../../errors/conflict';
import {
    FindUserByEmail,
    PersistUser,
} from '../../core/repositories/user.repository';
import { when } from 'jest-when';
import { EmailAddress } from '../../../../value-objects/emai/email';
import { HashGenerator } from '../../../../../main/ports/hash-manager/hash-manager';
import { emptyString } from '../../../../../__mocks__/values/string';

const inputExistentUser: AddUserInput = {
    name: 'Maria Silva',
    password: 'password@123',
    email: 'maria@email.com',
};

const inputNewtUser: AddUserInput = {
    ...inputExistentUser,
    email: 'new @email.com',
};

const passwordHashedMock = 'password_hashed';
const userIdMock = 'id';

const emailValidatorFailMock = jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorFailMock.mockImplementation(() => [new InvalidEmail()]);

const emailValidatorMock = jest.fn() as jest.MockedFunction<EmailValidator>;

const findUserMock = jest.fn() as jest.MockedFunction<FindUserByEmail>;
when(findUserMock)
    .calledWith(inputExistentUser.email)
    .mockResolvedValue({
        id: userIdMock,
        email: new EmailAddress(emailValidatorMock, inputExistentUser.email),
        imageUrl: 'https://test.jpeg',
        name: inputExistentUser.name,
        password: inputExistentUser.password,
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
    // @ts-ignore
    await expect(useCaseInstance.execute(undefined)).rejects.toThrow(
        new RequiredError('input')
    );
});

it('should throw an error if user email is not received', async () => {
    const errorExpected = new RequiredError('email');
    // @ts-ignore
    const input: AddUserInput = { ...inputExistentUser, email: undefined };
    await expect(useCaseInstanceMailFail.execute(input)).rejects.toThrow(
        errorExpected
    );
});

it('should throw an error if user email is invalid', async () => {
    const errorExpected = new InvalidFormatError('email');
    const input: AddUserInput = { ...inputExistentUser, email: 'test' };
    await expect(useCaseInstanceMailFail.execute(input)).rejects.toThrow(
        errorExpected
    );
});

it.each(emptyString)(
    'should throw an error if password is not provided: %s',
    async (password) => {
        const errorExpected = new RequiredError('password');
        // @ts-ignore
        const input: AddUserInput = { ...inputExistentUser, password };
        await expect(useCaseInstance.execute(input)).rejects.toThrow(
            errorExpected
        );
    }
);

it('should throw an error if user email already exists', async () => {
    const errorExpected = new ConflictError('user', 'email');
    await expect(useCaseInstance.execute(inputExistentUser)).rejects.toThrow(
        errorExpected
    );
});

it('should generate a user data with hashed password', async () => {
    await useCaseInstance.execute(inputNewtUser);
    expect(persistUserMock).toHaveBeenCalledTimes(1);
    expect(persistUserMock).toHaveBeenCalledWith({
        ...inputNewtUser,
        password: passwordHashedMock,
    });
});

it('should return a user data with user id', async () => {
    const expectedUser: UserLogged = { ...inputNewtUser, id: userIdMock };
    const userSaved = await useCaseInstance.execute(inputNewtUser);
    expect(userSaved).toEqual(expectedUser);
});
