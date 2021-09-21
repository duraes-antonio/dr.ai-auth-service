import 'reflect-metadata';
import { RequiredError } from '../../../../errors/required';
import { AddUserInput, UserLogged } from '../../core/use-cases/register-user';
import { InvalidFormatError } from '../../../../errors/invalid-format';
import { ConflictError } from '../../../../errors/conflict';
import { emptyString } from '../../../../../__mocks__/values/string';

import { existentUserMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { notExistentUserValidEmailMock } from '../../../../../__mocks__/adapters/validators/email-validator.mock';
import { getContainerDI } from '../../../../../main/config/dependency-injection/inversify/containers/di-container';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';
import { HashManager } from '../../../../ports/hash-manager/hash-manager';
import {
    FindUserByEmail,
    PersistUser,
} from '../../core/repositories/user.repository';
import { EmailValidator } from '../../../../ports/validation/validators/email.validator';
import { RegisterUserCase } from './register-user';

const inputExistentUser: AddUserInput = {
    name: existentUserMock.name,
    password: existentUserMock.password,
    email: existentUserMock.email.value,
};
const inputNewUser: AddUserInput = {
    ...inputExistentUser,
    email: notExistentUserValidEmailMock,
};
const passwordHashedMock = 'password_hashed';
const userIdMock = 1;
const containerDI = getContainerDI();

function makeSut() {
    const persistUser = containerDI.get<PersistUser>(TYPES.PersistUser);
    const useCaseInstance = new RegisterUserCase(
        containerDI.get<EmailValidator>(TYPES.EmailValidator),
        containerDI.get<FindUserByEmail>(TYPES.FindUserByEmail),
        persistUser,
        containerDI.get<HashManager>(TYPES.HashManager)
    );
    return {
        persistUser,
        useCaseInstance,
    };
}

it('should throw an error if input is not received', async () => {
    const { useCaseInstance } = makeSut();

    // @ts-ignore For allow invalid input
    await expect(useCaseInstance.execute(undefined)).rejects.toThrow(
        new RequiredError('input')
    );
});

it('should throw an error if user email is not received', async () => {
    const { useCaseInstance } = makeSut();
    const errorExpected = new RequiredError('email');

    // @ts-ignore For allow invalid input
    const input: AddUserInput = { ...inputExistentUser, email: undefined };
    await expect(useCaseInstance.execute(input)).rejects.toThrow(errorExpected);
});

it('should throw an error if user email is invalid', async () => {
    const { useCaseInstance } = makeSut();
    const errorExpected = new InvalidFormatError('email');
    const input: AddUserInput = { ...inputExistentUser, email: 'test' };
    await expect(useCaseInstance.execute(input)).rejects.toThrow(errorExpected);
});

it.each(emptyString)(
    'should throw an error if password is not provided: %s',
    async (password) => {
        const { useCaseInstance } = makeSut();
        const errorExpected = new RequiredError('password');
        // @ts-ignore For allow invalid input
        const input: AddUserInput = { ...inputExistentUser, password };
        await expect(useCaseInstance.execute(input)).rejects.toThrow(
            errorExpected
        );
    }
);

it('should throw an error if user email already exists', async () => {
    const { useCaseInstance } = makeSut();
    const errorExpected = new ConflictError('user', 'email');
    await expect(useCaseInstance.execute(inputExistentUser)).rejects.toThrow(
        errorExpected
    );
});

it('should generate a user data with hashed password', async () => {
    const { useCaseInstance, persistUser } = makeSut();
    jest.spyOn(persistUser, 'persist');
    await useCaseInstance.execute(inputNewUser);
    expect(persistUser.persist).toHaveBeenCalledTimes(1);
    expect(persistUser.persist).toHaveBeenCalledWith({
        ...inputNewUser,
        password: passwordHashedMock,
    });
});

it('should return a user data with user id', async () => {
    const { useCaseInstance } = makeSut();
    const expectedUser: UserLogged = { ...inputNewUser, id: userIdMock };
    const userSaved = await useCaseInstance.execute(inputNewUser);
    expect(userSaved).toEqual(expectedUser);
});
