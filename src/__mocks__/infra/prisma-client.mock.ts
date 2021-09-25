import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

export const prismaMock = mockDeep<PrismaClient>({
    user: {
        // @ts-ignore
        create: () => ({ id: 'id' }),
    },
});
