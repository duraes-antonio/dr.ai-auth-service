import { LoginCredentialsCase } from './login';
import { LoginCredentialsInput } from '../../core/use-cases/login';
import { TokenGeneratorWrapper } from '../../../../../main/ports/token/token-generator';
import {
    findByEmailMock,
    userEmailMock,
} from '../../../../../__mocks__/repositories/find-user';
import { NotFoundError } from '../../../../errors/not-found';
import { HashComparator } from '../../../../../main/ports/hash-manager/hash-manager';

const mockedToken = 'token';

const tokenGeneratorMock =
    jest.fn() as jest.MockedFunction<TokenGeneratorWrapper>;
tokenGeneratorMock.mockResolvedValue(mockedToken);

const hashComparatorMock = jest.fn() as jest.MockedFunction<HashComparator>;
hashComparatorMock.mockImplementation((plain, hashed) =>
    Promise.resolve(plain === hashed)
);

const useCase = new LoginCredentialsCase(
    tokenGeneratorMock,
    findByEmailMock,
    hashComparatorMock
);

const loginDataOk: LoginCredentialsInput = {
    password: 'password',
    username: userEmailMock,
};

const loginDataInvalidPass: LoginCredentialsInput = {
    ...loginDataOk,
    password: 'password_incorrect',
};

const loginDataInexistentEmail: LoginCredentialsInput = {
    ...loginDataOk,
    username: 'invalid@email.com',
};

it.each([loginDataInexistentEmail, loginDataInvalidPass])(
    `should throw error if password provided doesn't match with stored`,
    async (data: LoginCredentialsInput) => {
        // arrange
        const expectedError = new NotFoundError('user');

        // act & assert
        await expect(useCase.execute(data)).rejects.toThrow(expectedError);
    }
);

it('should check credentials and return an token', async () => {
    // act & assert
    await expect(useCase.execute(loginDataOk)).resolves.toBe(mockedToken);
});
