import 'reflect-metadata';
import http from 'http';
import fastifyCookie from 'fastify-cookie';
import FastifySessionPlugin from 'fastify-session';
import { fastify, RouteOptions } from 'fastify';
import { injectable } from 'inversify';
import { Server } from '../../infra/http/server';
import { HttpRequest, HttpRouteInput } from '../../infra/http/http.models';
import { RouteGenericInterface } from 'fastify/types/route';
import { BaseController } from '../../infra/controllers/base.controller';

const fastifySession = require('fastify-session');

type FastifyRouteOptions = RouteOptions<
    http.Server,
    http.IncomingMessage,
    http.ServerResponse,
    RouteGenericInterface,
    unknown
>;

export function adapterToFastifyRoute(
    route: HttpRouteInput<BaseController>
): FastifyRouteOptions {
    const { handler, method, url } = route;
    return {
        handler: async (fastifyRequest, reply) => {
            const request: HttpRequest = {
                session: {
                    sessionId: fastifyRequest.session.sessionId,
                },
                body: fastifyRequest.body,
                query: fastifyRequest.query,
            };
            const response = await handler.handle(request, fastifyRequest.body);
            const { code, result, errors } = response;
            reply.status(code).send(errors?.length ? { errors } : result);
        },
        method,
        url,
    };
}

@injectable()
export class ServerFastify implements Server {
    readonly fastifyInstance = fastify<http.Server>({ logger: true });
    readonly EMPTY_SESSION_KEY = 'EMPTY';

    constructor() {
        const sessionOptions: FastifySessionPlugin.Options = {
            cookieName: 'session',
            cookie: {
                secure: false,
                maxAge: this.hoursToMilliseconds(1),
            },
            secret: process.env.SESSION_KEY ?? this.EMPTY_SESSION_KEY,
        };
        this.fastifyInstance
            .register(fastifyCookie)
            .register(fastifySession, sessionOptions);
    }

    configureRoutes(routes: HttpRouteInput<BaseController>[]): void {
        routes.forEach((input) =>
            this.fastifyInstance.route(adapterToFastifyRoute(input))
        );
        this.fastifyInstance.route({
            method: 'GET',
            url: 'api/test',
            handler: (request, reply) => {
                reply.status(200).send('OK');
            },
        });
    }

    async listen(port: number | string): Promise<void> {
        await this.fastifyInstance.listen(port);
    }

    private hoursToMilliseconds(lifetimeInHours: number): number {
        // milliseconds * seconds * minutes * hours
        return 1000 * 60 * 60 * lifetimeInHours;
    }
}
