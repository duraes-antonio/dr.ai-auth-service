import { PrismaClient } from '@prisma/client';
import { PrismaClientProvider } from '../providers';
import { INFRA_TYPES } from '../../di-types';

export async function setupPrismaClient(
    prismaInstance: PrismaClient
): Promise<PrismaClient> {
    await prismaInstance.$connect();
    return prismaInstance;
}

export const prismaClientProvider: PrismaClientProvider = ({ container }) => {
    return () =>
        setupPrismaClient(
            container.get<PrismaClient>(INFRA_TYPES.PrismaClient)
        );
};
