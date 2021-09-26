import { PrismaClient } from '@prisma/client';

export type PrismaClientProvider = () => Promise<PrismaClient>;
