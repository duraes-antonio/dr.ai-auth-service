import { BaseController } from '../controllers/base.controller';
import { RequestSession } from './session';

export enum HttpMethods {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

export interface HttpRequest<B = unknown, Q = unknown> {
    body: B;
    query: Q;
    session: RequestSession;
}

export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export interface HttpRouteInput<C extends BaseController> {
    method: HttpMethods;
    url: string;
    handler: C;
    postHandler?: RoutePostHandler<C>;
}

export type RoutePostHandler<C extends BaseController> = (
    req: HttpRequest,
    output: ThenArg<ReturnType<C['handle']>>
) => HttpRequest;
