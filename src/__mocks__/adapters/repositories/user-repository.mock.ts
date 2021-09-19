import {
    UserForUpdate,
    UserRepository,
} from '../../../core/modules/user/core/repositories/user.repository';
import { mock } from 'jest-mock-extended';
import { userIdMock } from '../../use-case/register-user';
import { EmailAddress } from '../../../core/value-objects/email/email';
import { emailValidatorMock } from '../../email.validator';
import { User } from '../../../core/modules/user/core/entities/user.model';
import { AddUserInput } from '../../../core/modules/user/core/use-cases/register-user';
import { injectable } from 'inversify';
import { when } from 'jest-when';

export const userEmailMock = 'email@email.com';
export const existentUserMock = {
    email: new EmailAddress(emailValidatorMock, userEmailMock),
    password: 'password',
    id: 1,
    name: 'User Name',
    imageUrl: 'https://image.jpeg',
};

@injectable()
export class UserRepositoryMock implements UserRepository {
    readonly userRepositoryMock = mock<UserRepository>();
    readonly findByEmailMock = jest.fn();
    readonly persistMock = jest.fn();
    readonly updateMock = jest.fn();

    constructor() {
        when(this.findByEmailMock)
            .calledWith(userEmailMock)
            .mockResolvedValue(existentUserMock);
        this.persist =
            this.userRepositoryMock.persist.mockResolvedValue(userIdMock);
        this.update = this.userRepositoryMock.update.mockResolvedValue();
    }

    findByEmail(email: string): Promise<User | undefined> {
        return this.findByEmailMock(email);
    }

    persist(user: AddUserInput): Promise<number> {
        return Promise.resolve(1);
    }

    update(user: UserForUpdate): Promise<void> {
        return Promise.resolve(undefined);
    }
}
