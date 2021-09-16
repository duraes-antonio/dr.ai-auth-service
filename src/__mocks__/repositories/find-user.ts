import MockedFunction = jest.MockedFunction;
import { FindUserByEmail } from '../../core/modules/user/core/repositories/user.repository';
import { EmailAddress } from '../../core/value-objects/email/email';
import { emailValidatorMock } from '../email.validator';

export const findByEmailMock = jest.fn() as MockedFunction<FindUserByEmail>;

export const userEmailMock = 'email@email.com';

findByEmailMock.mockImplementation((email) => {
    if (email !== userEmailMock) {
        return Promise.resolve(undefined);
    }
    return Promise.resolve({
        email: new EmailAddress(emailValidatorMock, userEmailMock),
        password: 'password',
        id: 'id',
        name: 'User Name',
        imageUrl: 'https://image.jpeg',
    });
});
