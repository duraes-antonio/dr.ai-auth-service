import { Server } from '../../infra/http/server';
import { HttpRouteInput } from '../../infra/http/http-router';
import fastify, { RouteOptions } from 'fastify';
import http from 'http';
import { BaseController } from '../../infra/controllers/base.controller';
import { RouteGenericInterface } from 'fastify/types/route';

type FastifyRouteOptions = RouteOptions<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse,
    RouteGenericInterface,
    unknown
>;

function mapRouteToFastifyRoute(route: HttpRouteInput): FastifyRouteOptions {
    const { handler, method, url } = route;
    return {
        handler: async (request, reply) => {
            const body = request.body;
            const controller: BaseController = handler;
            const { code, result, errors } = await controller.handle(body);
            reply.status(code).send(errors?.length ? { errors } : result);
        },
        method,
        url,
    };
}

export class ServerFastify implements Server {
    readonly fastifyInstance = fastify<http.Server>({ logger: true });

    configureRoutes(routes: HttpRouteInput[]): void {
        routes.forEach((input) =>
            this.fastifyInstance.route(mapRouteToFastifyRoute(input))
        );
    }

    async listen(port: number | string): Promise<void> {
        await this.fastifyInstance.listen(port);
    }
}
