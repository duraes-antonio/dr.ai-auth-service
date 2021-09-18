import { RegisterUserCase } from './register-user';
import { RequiredError } from '../../../../errors/required';
import { AddUserInput, UserLogged } from '../../core/use-cases/register-user';
import {
    InvalidEmail,
    InvalidFormatError,
} from '../../../../errors/invalid-format';
import { EmailValidator } from '../../../../ports/validation/validators/email.validator';
import { ConflictError } from '../../../../errors/conflict';
import {
    IFindUserByEmail,
    IPersistUser,
} from '../../core/repositories/user.repository';
import { HashGenerator } from '../../../../ports/hash-manager/hash-manager';
import { emptyString } from '../../../../../__mocks__/values/string';
import { mock } from 'jest-mock-extended';

import { existentUserMock } from '../../../../../__mocks__/repositories/user-repository.mock';
import { getContainerDI } from '../../../../../main/config/dependency-injection/inversify/containers/di-container';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';

const inputExistentUser: AddUserInput = {
    name: existentUserMock.name,
    password: existentUserMock.password,
    email: existentUserMock.email.value,
};

const inputNewtUser: AddUserInput = {
    ...inputExistentUser,
    email: 'new @email.com',
};

const passwordHashedMock = 'password_hashed';
const userIdMock = 1;
const emailValidatorMock = jest.fn() as jest.MockedFunction<EmailValidator>;
const containerDI = getContainerDI();
const findUserMock = containerDI.get<IFindUserByEmail>(TYPES.IFindUserByEmail);

const emailValidatorFailMock = jest.fn() as jest.MockedFunction<EmailValidator>;
emailValidatorFailMock.mockImplementation(() => [new InvalidEmail()]);

const hashGeneratorMock = jest.fn() as jest.MockedFunction<HashGenerator>;
hashGeneratorMock.mockResolvedValue(passwordHashedMock);

const persistUserMock = mock<IPersistUser>();
persistUserMock.persist.mockResolvedValue(userIdMock);

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
    expect(persistUserMock.persist).toHaveBeenCalledTimes(1);
    expect(persistUserMock.persist).toHaveBeenCalledWith({
        ...inputNewtUser,
        password: passwordHashedMock,
    });
});

it('should return a user data with user id', async () => {
    const expectedUser: UserLogged = { ...inputNewtUser, id: userIdMock };
    const userSaved = await useCaseInstance.execute(inputNewtUser);
    expect(userSaved).toEqual(expectedUser);
});
