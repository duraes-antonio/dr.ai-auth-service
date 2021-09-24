import 'reflect-metadata';
import { fastify, RouteOptions } from 'fastify';
import http from 'http';
import { Server } from '../../infra/http/server';
import { HttpRouteInput } from '../../infra/http/http-router';
import { RouteGenericInterface } from 'fastify/types/route';
import { injectable } from 'inversify';

type FastifyRouteOptions = RouteOptions<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse,
    RouteGenericInterface,
    unknown
>;

export function adapterToFastifyRoute(
    route: HttpRouteInput
): FastifyRouteOptions {
    const { handler, method, url } = route;
    return {
        handler: async (request, reply) => {
            const body = request.body;
            const { code, result, errors } = await handler.handle(body);
            reply.status(code).send(errors?.length ? { errors } : result);
        },
        method,
        url,
    };
}

@injectable()
export class ServerFastify implements Server {
    readonly fastifyInstance = fastify<http.Server>({ logger: true });

    configureRoutes(routes: HttpRouteInput[]): void {
        routes.forEach((input) =>
            this.fastifyInstance.route(adapterToFastifyRoute(input))
        );
    }

    async listen(port: number | string): Promise<void> {
        await this.fastifyInstance.listen(port);
    }
}
