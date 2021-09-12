import { RegisterUserCase } from '../modules/user/application/use-cases/register-user/register-user';
import { User } from '../modules/user/core/entities/user.model';
import { EmailAddress } from '../core/value-objects/emai/email';
import { emailValidatorMock } from './email.validator';

export const userIdMock = 'id';

const execute = jest.fn() as jest.MockedFunction<
    typeof RegisterUserCase.prototype.execute
>;

execute.mockImplementation((input) => {
    return Promise.resolve<User>({
        ...input,
        email: new EmailAddress(emailValidatorMock, input.email),
        id: userIdMock,
    });
});

const mock = jest.fn().mockImplementation(() => {
    return { execute };
});

export { mock as RegisterUseCase };
