import 'reflect-metadata';
import { UpdateUserCase } from './update-user';
import { UpdateUserInput } from '../../core/use-cases/update-user';
import { FileStorage } from '../../../../ports/file-storage/file-storage';
import { existentUserMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import { getContainerDI } from '../../../../../main/config/dependency-injection/inversify/containers/di-container';
import {
    IUpdateUser,
    UserForUpdate,
} from '../../core/repositories/user.repository';
import { TYPES } from '../../../../../main/config/dependency-injection/inversify/di-types';

const containerDI = getContainerDI();
const FileMock = jest.fn() as jest.MockedClass<typeof File>;
const image = new FileMock([], 'mock.jpeg');
const imageUrl = `https://storage/${image.name}`;
const useCaseInput: UpdateUserInput = {
    name: existentUserMock.name,
    id: existentUserMock.id,
    image,
};

const factoryDependencies = () => {
    const updateUserRepository = containerDI.get<IUpdateUser>(
        TYPES.IUpdateUser
    );
    const fileStorage: FileStorage = {
        save: jest.fn().mockResolvedValue(imageUrl),
        delete: jest.fn(),
    };
    const useCase = new UpdateUserCase(updateUserRepository, fileStorage);
    return { useCase, fileStorage, updateUserRepository };
};

it('should ignore empty input and return success', async () => {
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();

    // @ts-ignore
    await useCase.execute(undefined);

    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateUserRepository.update).not.toHaveBeenCalled();
});

it('should call dependencies with name and image file', async () => {
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();
    const inputExpected: UserForUpdate = {
        name: useCaseInput.name,
        id: useCaseInput.id,
        imageUrl,
    };

    await useCase.execute(useCaseInput);

    expect(fileStorage.save).toHaveBeenCalledTimes(1);
    expect(fileStorage.save).toHaveBeenCalledWith(image);
    expect(updateUserRepository.update).toHaveBeenCalledTimes(1);
    expect(updateUserRepository.update).toHaveBeenCalledWith(inputExpected);
});

it(`should call repository with user name, but not call file storage`, async () => {
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();
    const input = { ...useCaseInput, image: undefined };
    const updateInputExpected: UserForUpdate = {
        name: input.name,
        id: input.id,
    };

    await useCase.execute(input);

    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateUserRepository.update).toHaveBeenCalledTimes(1);
    expect(updateUserRepository.update).toHaveBeenCalledWith(
        updateInputExpected
    );
});
