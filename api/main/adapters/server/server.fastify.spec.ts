import { fastify, FastifyRequest } from 'fastify';
import { adapterToFastifyRoute, ServerFastify } from './server.fastify';
import { HttpMethods, HttpRouteInput } from '../../infra/http/http.models';
import { RegisterUserController } from '../../infra/controllers/user/register/user-register.controller';
import { getContainerDI } from '../../config/dependency-injection/inversify/containers/di-container';
import { BaseController } from '../../infra/controllers/base.controller';
import { mockDeep } from 'jest-mock-extended';

const serverToListen = new ServerFastify();
const containerDI = getContainerDI();
const controller = containerDI.get<RegisterUserController>(
    RegisterUserController
);
const routes: HttpRouteInput<BaseController>[] = [
    {
        method: HttpMethods.POST,
        url: 'test',
        handler: controller,
    },
];

afterAll(async () => await serverToListen.fastifyInstance.close());

it('should create a fastify instance when constructor is called', () => {
    const expected = JSON.stringify(fastify({ logger: true }));

    const server = new ServerFastify();

    // Using stringify to get around the difficulty of spying the fastify function
    expect(JSON.stringify(server.fastifyInstance)).toEqual(expected);
});

it('should start fastify server when listen function is called', async () => {
    jest.spyOn(serverToListen.fastifyInstance.server, 'listen');

    await serverToListen.listen(3000);

    expect(serverToListen.fastifyInstance.server.listen).toHaveBeenCalledTimes(
        1
    );
});

it('should attach routes on fastify instance when configureRoutes is called', () => {
    const server = new ServerFastify();
    jest.spyOn(server.fastifyInstance, 'route');

    server.configureRoutes(routes);
    expect(server.fastifyInstance.route).toHaveBeenCalledTimes(1);
});

it('should mapper a generic route to fastify route', async () => {
    const genericRoute = routes[0];
    const request = mockDeep<FastifyRequest>();
    const reply: { status: Function; send: Function } = {
        status: jest.fn(() => reply),
        send: jest.fn(() => reply),
    };
    const fastifyRoute = adapterToFastifyRoute(genericRoute);

    // @ts-ignore
    await fastifyRoute.handler(request, reply);

    expect(fastifyRoute.method).toBe(genericRoute.method);
    expect(fastifyRoute.url).toBe(genericRoute.url);
    expect(reply.status).toHaveBeenCalled();
});
