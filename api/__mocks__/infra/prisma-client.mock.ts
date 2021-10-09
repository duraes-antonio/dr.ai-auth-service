import { PrismaClient } from '@prisma/client';
import { Mock } from 'moq.ts';

const prismaMock = new Mock<PrismaClient>()
    .setup((instance) => instance.$connect)
    .returns(() => Promise.resolve(undefined))

    .setup((instance) => instance.user.findUnique)
    // @ts-ignore
    .returns(() => Promise.resolve(undefined))

    .setup((instance) => instance.user.create)
    // @ts-ignore
    .returns(() => Promise.resolve({ id: 'id' }))

    .setup((instance) => instance.user.update)
    // @ts-ignore
    .returns(() => Promise.resolve(undefined))

    .setup((instance) => instance.$connect)
    .returns(() => Promise.resolve(undefined))

    .object();

export { prismaMock };
