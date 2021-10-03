import { PrismaClient } from '@prisma/client';
import { PrismaClientProvider } from '../providers';
import { INFRA_TYPES } from '../../di-types';
import { interfaces } from 'inversify';

export async function setupPrismaClient(
    prismaInstance: PrismaClient
): Promise<PrismaClient> {
    console.log('*************************', process.env.TEST_VAR);
    await prismaInstance.$connect();
    return prismaInstance;
}

export const prismaClientProviderWrapper: (
    context: interfaces.Context
) => PrismaClientProvider = ({ container }) => {
    return () =>
        setupPrismaClient(
            container.get<PrismaClient>(INFRA_TYPES.PrismaClient)
        );
};
