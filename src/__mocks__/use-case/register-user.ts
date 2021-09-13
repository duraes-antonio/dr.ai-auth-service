import { RegisterUserCase } from '../../core/modules/user/use-cases/register-user/register-user';

export const userIdMock = 'id';

const execute = jest.fn() as jest.MockedFunction<
    typeof RegisterUserCase.prototype.execute
>;

execute.mockImplementation((input) => {
    return Promise.resolve({ ...input, id: userIdMock });
});

const mock = jest.fn().mockImplementation(() => {
    return { execute };
});

export { mock as RegisterUseCase };
