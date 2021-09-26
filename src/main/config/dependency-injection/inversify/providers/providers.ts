import { PrismaClient } from '@prisma/client';
import { interfaces } from 'inversify';

export type PrismaClientProvider = (
    context: interfaces.Context
) => () => Promise<PrismaClient>;
