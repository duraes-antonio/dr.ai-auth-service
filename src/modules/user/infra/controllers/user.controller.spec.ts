import { UserController } from './user.controller';
import { AddUserInput } from '../../core/use-cases/register-user';
import {
    RegisterUseCase,
    userIdMock,
} from '../../../../__mocks__/register-user';
import {
    TokenGenerator,
    TokenGeneratorInput,
} from '../../../../ports/token/token';
import { User } from '../../core/entities/user.model';
import { EmailAddress } from '../../../../core/value-objects/emai/email';
import { emailValidatorMock } from '../../../../__mocks__/email.validator';
import MockedFunction = jest.MockedFunction;

const registerUseCase = new RegisterUseCase();
const tokenSecretMock = 'secret';
const tokenExpires10Minutes = Date.now() + 1000 * 60 * 10;

const tokenMock = 'token';
const tokenGeneratorMock = jest.fn() as MockedFunction<TokenGenerator>;
tokenGeneratorMock.mockResolvedValue(tokenMock);

const userInputMock: AddUserInput = {
    email: 'test@email.com',
    password: 'password',
    name: 'Jorge da Silva',
};

const controller = new UserController(registerUseCase, tokenGeneratorMock);

it('should call use case and return response with token', async () => {
    const user: User = {
        ...userInputMock,
        email: new EmailAddress(emailValidatorMock, userInputMock.email),
        id: userIdMock,
    };
    const token = await controller.register(
        userInputMock,
        tokenSecretMock,
        tokenExpires10Minutes
    );
    const tokenInputExpected: TokenGeneratorInput = {
        data: user,
        expiresIn: tokenExpires10Minutes,
        privateKey: tokenSecretMock,
    };
    expect(registerUseCase.execute).toHaveBeenCalledTimes(1);
    expect(registerUseCase.execute).toHaveBeenCalledWith(userInputMock);
    expect(tokenGeneratorMock).toHaveBeenCalledTimes(1);
    expect(tokenGeneratorMock).toHaveBeenCalledWith(tokenInputExpected);
    expect(token).toBe(tokenMock);
});
