import { LoginCredentialsCase } from './login';
import { LoginCredentialsInput } from '../../core/use-cases/login';
import { TokenGeneratorWrapper } from '../../../../ports/token/token-generator';
import {
    findByEmailMock,
    userEmailMock,
} from '../../../../../__mocks__/repositories/find-user';
import { NotFoundError } from '../../../../errors/not-found';
import { HashComparator } from '../../../../ports/hash-manager/hash-manager';
import { RequiredError } from '../../../../errors/required';

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
    await expect(useCase.execute(loginDataOk)).resolves.toBe(mockedToken);
});
