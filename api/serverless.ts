import Fastify from 'fastify';

// Instantiate Fastify with some config
const app = Fastify({
    logger: false,
});

// Register your application as a normal plugin.
app.register(import('../src/main/test'), {
    prefix: '/',
});

export default async (req: any, res: any) => {
    await app.ready();
    app.server.emit('request', req, res);
};
