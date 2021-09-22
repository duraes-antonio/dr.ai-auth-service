import 'reflect-metadata';
import { LoginCredentialsCase } from './login';
import { LoginCredentialsInput } from '../../core/use-cases/login';
import { NotFoundError } from '../../../../errors/not-found';
import { RequiredError } from '../../../../errors/required';
import { HashManager } from '../../../../ports/hash-manager/hash-manager';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';
import { FindUserByEmail } from '../../../user/core/repositories/user.repository';
import { userValidEmailMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { getContainerDI } from '../../../../../main/config/dependency-injection/inversify/containers/di-container';

const containerDI = getContainerDI();
const hashComparator = containerDI.get<HashManager>(TYPES.HashManager);
const findByEmail = containerDI.get<FindUserByEmail>(TYPES.FindUserByEmail);

const useCase = new LoginCredentialsCase(findByEmail, hashComparator);

const loginDataOk: LoginCredentialsInput = {
    password: 'password',
    username: userValidEmailMock,
};

const loginDataInvalidPass: LoginCredentialsInput = {
    ...loginDataOk,
    password: 'password_incorrect',
};

const loginDataInexistentEmail: LoginCredentialsInput = {
    ...loginDataOk,
    username: 'invalid@email.com',
};

const nullableValues = [undefined, null];

it.each(nullableValues)(
    'should throw if credentials is not provided',
    async (invalidValue) => {
        const expectedError = new RequiredError('credentials');
        // @ts-ignore
        await expect(useCase.execute(invalidValue)).rejects.toThrow(
            expectedError
        );
    }
);

it(`should throw error if password provided doesn't match with stored`, async () => {
    const expectedError = new NotFoundError('user');
    await expect(useCase.execute(loginDataInvalidPass)).rejects.toThrow(
        expectedError
    );
});

it(`should throw error if not exists an user with username received`, async () => {
    const expectedError = new NotFoundError('user');
    await expect(useCase.execute(loginDataInexistentEmail)).rejects.toThrow(
        expectedError
    );
});

it('should check credentials and return an token', async () => {
    await expect(useCase.execute(loginDataOk)).resolves;
});
