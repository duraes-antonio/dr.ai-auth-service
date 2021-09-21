import 'reflect-metadata';
import {
    UserForUpdate,
    UserRepository,
} from '../../../core/modules/user/core/repositories/user.repository';
import { AddUserInput } from '../../../core/modules/user/core/use-cases/register-user';
import { EmailAddress } from '../../../core/value-objects/email/email';
import { EmailValidatorMock } from '../validators/email-validator.mock';
import { It, Mock } from 'moq.ts';

export const userValidEmailMock = 'email@email.com';

const emailValidatorMock = new EmailValidatorMock();

export const existentUserMock = {
    email: new EmailAddress(emailValidatorMock, userValidEmailMock),
    password: 'password',
    id: 1,
    name: 'User Name',
    imageUrl: 'https://image.jpeg',
};

export function factoryUserRepositoryMock(): UserRepository {
    return new Mock<UserRepository>()
        .setup((instance) =>
            instance.findByEmail(It.Is((e) => e === userValidEmailMock))
        )
        .returns(Promise.resolve(existentUserMock))

        .setup((instance) => instance.update(It.IsAny<UserForUpdate>()))
        .returns(Promise.resolve(undefined))

        .setup((instance) => instance.persist(It.IsAny<AddUserInput>()))
        .returns(Promise.resolve(existentUserMock.id))

        .object();
}
