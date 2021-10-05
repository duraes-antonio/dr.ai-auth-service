import 'reflect-metadata';
import { UpdateUserCase } from './update-user';
import { UpdateUserInput } from '../../core/use-cases/update-user';
import { FileStorage } from '../../../../ports/file-storage/file-storage';
import { existentUserMock } from '../../../../../__mocks__/adapters/repositories/user-repository.mock';
import {
    UpdateUser,
    UserForUpdate,
} from '../../core/repositories/user.repository';
import {
    INFRA_TYPES,
    TYPES,
} from '../../../../../main/config/dependency-injection/inversify/di-types';
import { getContainerDI } from '../../../../../main/config/dependency-injection/inversify/containers/di-container';
import {
    imageMock,
    imageUrl,
} from '../../../../../__mocks__/adapters/file/file-storage.mock';

const containerDI = getContainerDI();
const useCaseInput: UpdateUserInput = {
    name: existentUserMock.name,
    id: existentUserMock.id,
    image: imageMock,
};

function makeSut() {
    const updateRepository = containerDI.get<UpdateUser>(TYPES.UpdateUser);
    const fileStorage = containerDI.get<FileStorage>(INFRA_TYPES.FileStorage);
    const useCase = new UpdateUserCase(updateRepository, fileStorage);
    return { useCase, fileStorage, updateRepository };
}

it('should ignore empty input and return success', async () => {
    const { useCase, fileStorage, updateRepository } = makeSut();
    jest.spyOn(fileStorage, 'save');
    jest.spyOn(updateRepository, 'update');

    // @ts-ignore
    await useCase.execute(undefined);
    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateRepository.update).not.toHaveBeenCalled();
});

it('should call dependencies with name and image file', async () => {
    const { useCase, fileStorage, updateRepository } = makeSut();
    const repositoryInputExpected: UserForUpdate = {
        name: useCaseInput.name,
        id: useCaseInput.id,
        imageUrl,
    };
    jest.spyOn(fileStorage, 'save');
    jest.spyOn(updateRepository, 'update');

    await useCase.execute(useCaseInput);

    expect(fileStorage.save).toHaveBeenCalledTimes(1);
    expect(fileStorage.save).toHaveBeenCalledWith(imageMock);
    expect(updateRepository.update).toHaveBeenCalledTimes(1);
    expect(updateRepository.update).toHaveBeenCalledWith(
        repositoryInputExpected
    );
});

it(`should call repository with user name, but not call file storage`, async () => {
    const { useCase, fileStorage, updateRepository } = makeSut();
    const inputUseCase = { ...useCaseInput, image: undefined };
    const updateInputExpected: UserForUpdate = {
        name: inputUseCase.name,
        id: inputUseCase.id,
    };
    jest.spyOn(fileStorage, 'save');
    jest.spyOn(updateRepository, 'update');

    await useCase.execute(inputUseCase);

    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateRepository.update).toHaveBeenCalledTimes(1);
    expect(updateRepository.update).toHaveBeenCalledWith(updateInputExpected);
});
