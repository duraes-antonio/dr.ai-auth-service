import { LogoutCase } from './logout';
import { PersistToken } from '../../core/repositories/token.repository';
import { emptyString } from '../../../../../__mocks__/values/string';
import { RequiredError } from '../../../../errors/required';
import { factoryMessageError } from '../../../../errors/error-message.factory';

const factoryDependencies = () => {
    const persistTokenMock = jest.fn() as jest.MockedFunction<PersistToken>;
    const useCase = new LogoutCase(persistTokenMock);
    return { useCase, persistTokenMock };
};

it('should call repository with received token', async () => {
    // arrange
    const { useCase, persistTokenMock } = factoryDependencies();
    const inputToken = 'token';

    // act
    await useCase.execute(inputToken);

    // assert
    expect(persistTokenMock).toHaveBeenCalledTimes(1);
    expect(persistTokenMock).toHaveBeenCalledWith(inputToken);
});

it.each(emptyString)(
    'should throw an error if try store a empty value',
    async (inputToken) => {
        // arrange
        const { useCase, persistTokenMock } = factoryDependencies();
        const expectedError = new RequiredError(
            'current token',
            factoryMessageError.requiredParam
        );

        // act & assert
        // @ts-ignore
        await expect(useCase.execute(inputToken)).rejects.toThrow(
            expectedError
        );
        expect(persistTokenMock).not.toHaveBeenCalled();
    }
);
