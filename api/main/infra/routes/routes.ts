import { BaseController } from '../controllers/base.controller';
import {
    HttpMethods,
    HttpRouteInput,
    RoutePostHandler,
} from '../http/http.models';

const API_PREFIX = '/api';

export function createRouteInput<C extends BaseController>(
    url: string,
    method: HttpMethods,
    handler: C,
    postHandler?: RoutePostHandler<C>
): HttpRouteInput<C> {
    return {
        url: `${API_PREFIX}/${url}`,
        method,
        handler,
        postHandler,
    };
}
