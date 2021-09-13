import { LogoutCase } from './logout';
import { PersistToken } from '../../core/repositories/token.repository';
import { emptyString } from '../../../../../__mocks__/values/string';
import { RequiredError } from '../../../../errors/required';
import { factoryMessageError } from '../../../../errors/error-message.factory';

const persistTokenMock = jest.fn() as jest.MockedFunction<PersistToken>;
const useCase = new LogoutCase(persistTokenMock);

it('should call repository with received token', async () => {
    // arrange
    const inputToken = 'token';

    // act & assert
    await useCase.execute(inputToken);
    expect(persistTokenMock).toHaveBeenCalledTimes(1);
    expect(persistTokenMock).toHaveBeenCalledWith(inputToken);
});

it.each(emptyString)(
    'should throw an error if try store a empty value',
    async (inputToken) => {
        // arrange
        const expectedError = new RequiredError(
            'current token',
            factoryMessageError.requiredParam
        );

        // act & assert
        await expect(useCase.execute(inputToken)).rejects.toThrow(
            expectedError
        );
    }
);
