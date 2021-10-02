import { BaseController } from '../controllers/base.controller';
import {
    HttpMethods,
    HttpRouteInput,
    RoutePostHandler,
    ThenArg,
} from '../http/http.models';

const API_PREFIX = '/api';

export function createRouteInput<C extends BaseController>(
    url: string,
    method: HttpMethods,
    handler: C,
    postHandler?: RoutePostHandler<ThenArg<ReturnType<C['handle']>>>
): HttpRouteInput<C> {
    return {
        url: `${API_PREFIX}/${url}`,
        method,
        handler,
        postHandler,
    };
}
