import {
    FastifyInstance,
    FastifyReply,
    FastifyRequest,
    FastifyServerOptions,
} from 'fastify';
import { RegisterUserController } from './infra/controllers/user/register/user-register.controller';

export default async function (
    instance: FastifyInstance,
    opts: FastifyServerOptions,
    done: () => void
) {
    instance.get('/hello', async (req: FastifyRequest, res: FastifyReply) => {
        res.status(200).send({
            hello: 'World',
        });
    });

    instance.get(`/api`, async (req: any, reply: any) => {
        // @ts-ignore
        const useCase = new RegisterUserController(undefined, undefined);
        await new Promise((r) => setTimeout(r, Math.random() * 5000));
        reply.status(200).send(useCase);
    });

    done();
}
