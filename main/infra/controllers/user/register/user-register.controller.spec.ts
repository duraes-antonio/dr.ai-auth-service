import { RegisterUserController } from './user-register.controller';
import { getContainerDI } from '../../../../config/dependency-injection/inversify/containers/di-container';
import {
    AddUserInput,
    IRegisterUserCase,
} from '../../../../../core/modules/user/core/use-cases/register-user';
import {
    INFRA_TYPES,
    USE_CASE_TYPES,
} from '../../../../config/dependency-injection/inversify/di-types';
import { SessionStore } from '../../../../../core/ports/session-storage/session-storage';
import { HttpRequest } from '../../../http/http.models';
import { UserSession } from '../../../../../core/modules/user/core/entities/session.model';
import {
    notExistentUserValidEmailMock,
    validEmail,
} from '../../../../../__mocks__/adapters/validators/email-validator.mock';
import { existentUserMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';

const containerDI = getContainerDI();
const expectedSession: UserSession = {
    sessionId: 'id',
    user: {
        name: 'Name',
        email: notExistentUserValidEmailMock,
        id: existentUserMock.id,
    },
};
const request: HttpRequest<AddUserInput> = {
    body: {
        ...expectedSession.user,
        password: 'password',
    },
    query: null,
    session: {
        sessionId: expectedSession.sessionId,
    },
};

function makeSut(): { useCase: IRegisterUserCase; sessionStore: SessionStore } {
    const useCase = containerDI.get<IRegisterUserCase>(
        USE_CASE_TYPES.IRegisterUserCase
    );
    const sessionStore = containerDI.get<SessionStore>(
        INFRA_TYPES.SessionStore
    );
    return { useCase, sessionStore };
}

it('should call the store if the registration was completed successfully', async () => {
    const { sessionStore, useCase } = makeSut();
    const controller = new RegisterUserController(useCase, sessionStore);

    await controller.handle(request, request.body);

    expect(sessionStore.set).toHaveBeenCalledTimes(1);
    expect(sessionStore.set).toHaveBeenCalledWith(
        expectedSession.sessionId,
        expectedSession
    );
});

it('should not call the store if an error occurs', async () => {
    const { sessionStore, useCase } = makeSut();
    const controller = new RegisterUserController(useCase, sessionStore);
    const requestConflictEmail: typeof request = {
        ...request,
        body: {
            ...request.body,
            email: validEmail,
        },
    };

    await controller.handle(requestConflictEmail, requestConflictEmail.body);

    expect(sessionStore.set).not.toHaveBeenCalled();
});
