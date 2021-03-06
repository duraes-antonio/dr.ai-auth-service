import { fastify } from 'fastify';
import { adapterToFastifyRoute, ServerFastify } from './server.fastify';
import { HttpRouteInput } from '../../infra/http/http-router';
import { HttpMethods } from '../../infra/http/http-methods';
import { RegisterUserController } from '../../infra/controllers/user/user-register.controller';
import { getContainerDI } from '../../config/dependency-injection/inversify/containers/di-container';

const serverToListen = new ServerFastify();
const containerDI = getContainerDI();
const controller = containerDI.get<RegisterUserController>(
    RegisterUserController
);
const routes: HttpRouteInput[] = [
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
    const request = jest.fn().mockImplementation();
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
