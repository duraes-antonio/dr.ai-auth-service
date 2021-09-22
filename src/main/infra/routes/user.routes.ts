import 'reflect-metadata';
import { HttpRouteInput } from '../http/http-router';
import { HttpMethods } from '../http/http-methods';
import { BaseController } from '../controllers/base.controller';
import { getContainerDI } from '../../config/dependency-injection/inversify/containers/di-container';
import { RegisterUserController } from '../controllers/user/user-register.controller';
import { UpdateUserController } from '../controllers/user/user-update.controlller';

const API_PREFIX = '/api';

function createRouteInput(
    url: string,
    method: HttpMethods,
    handler: BaseController
): HttpRouteInput {
    return { url: `${API_PREFIX}/${url}`, method, handler };
}

const containerDI = getContainerDI();

export const USER_ROUTES: HttpRouteInput[] = [
    createRouteInput(
        'user',
        HttpMethods.POST,
        containerDI.get<RegisterUserController>(RegisterUserController)
    ),
    createRouteInput(
        'user',
        HttpMethods.PATCH,
        containerDI.get<UpdateUserController>(UpdateUserController)
    ),
];
