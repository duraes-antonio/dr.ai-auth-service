import { prismaClientProvider } from './prisma-client.provider';
import { mockDeep } from 'jest-mock-extended';
import { interfaces } from 'inversify';
import { INFRA_TYPES } from '../../di-types';
import { prismaMock } from '../../../../../../__mocks__/infra/prisma-client.mock';

it('should get prisma client instance and call connect method', async () => {
    const mockedInversifyContext = mockDeep<interfaces.Context>({
        container: {
            get: jest.fn().mockReturnValue(prismaMock),
        },
    });
    const provider = prismaClientProvider(mockedInversifyContext);
    await provider();
    expect(mockedInversifyContext.container.get).toHaveBeenCalledTimes(1);
    expect(mockedInversifyContext.container.get).toHaveBeenCalledWith(
        INFRA_TYPES.PrismaClient
    );
    expect(prismaMock.$connect).toHaveBeenCalled();
});
