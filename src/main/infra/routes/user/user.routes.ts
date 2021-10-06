import 'reflect-metadata';
import { HttpMethods, HttpRouteInput } from '../../http/http.models';
import { BaseController } from '../../controllers/base.controller';
import { getContainerDI } from '../../../config/dependency-injection/inversify/containers/di-container';
import { RegisterUserController } from '../../controllers/user/register/user-register.controller';
import { UpdateUserController } from '../../controllers/user/user-update.controlller';
import { createRouteInput } from '../routes';

const containerDI = getContainerDI();

export const registerRoute = createRouteInput<RegisterUserController>(
    'user',
    HttpMethods.POST,
    containerDI.get<RegisterUserController>(RegisterUserController)
);

export const updateRoute = createRouteInput(
    'user',
    HttpMethods.PATCH,
    containerDI.get<UpdateUserController>(UpdateUserController)
);

export const USER_ROUTES: HttpRouteInput<BaseController>[] = [
    registerRoute,
    updateRoute,
];
