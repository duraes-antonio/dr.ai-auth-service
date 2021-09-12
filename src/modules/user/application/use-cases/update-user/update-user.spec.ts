import { UpdateUserCase } from './update-user';
import {
    UpdateUser,
    UserForUpdate,
} from '../../../core/repositories/user.repository';
import { UpdateUserInput } from '../../../core/use-cases/update-user';
import { FileStorage } from '../../../../../ports/file-storage/file-storage';

const FileMock = jest.fn() as jest.MockedClass<typeof File>;
const image = new FileMock([], 'mock.jpeg');
const imageUrl = `https://storage/${image.name}`;
const useCaseInput: UpdateUserInput = {
    name: 'User test',
    image,
};

const factoryDependencies = () => {
    const updateUserRepository = jest.fn() as jest.MockedFunction<UpdateUser>;
    const fileStorage: FileStorage = {
        save: jest.fn().mockResolvedValue(imageUrl),
        delete: jest.fn(),
    };
    const useCase = new UpdateUserCase(updateUserRepository, fileStorage);
    return { useCase, fileStorage, updateUserRepository };
};

it('should ignore empty input and return success', async () => {
    // Arrange
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();

    // Act
    await useCase.execute(undefined);

    // Assert
    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateUserRepository).not.toHaveBeenCalled();
});

it('should call dependencies with name and image file', async () => {
    // Arrange
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();
    const inputExpected = { name: useCaseInput.name, imageUrl };

    // Act
    await useCase.execute(useCaseInput);

    // Assert
    expect(fileStorage.save).toHaveBeenCalledTimes(1);
    expect(fileStorage.save).toHaveBeenCalledWith(image);
    expect(updateUserRepository).toHaveBeenCalledTimes(1);
    expect(updateUserRepository).toHaveBeenCalledWith(inputExpected);
});

it(`should call repository with user name, but not call file storage`, async () => {
    // Arrange
    const { useCase, fileStorage, updateUserRepository } =
        factoryDependencies();
    const input = { ...useCaseInput, image: undefined };
    const updateInputExpected: UserForUpdate = { name: input.name };

    // Act
    await useCase.execute(input);

    // Assert
    expect(fileStorage.save).not.toHaveBeenCalled();
    expect(updateUserRepository).toHaveBeenCalledTimes(1);
    expect(updateUserRepository).toHaveBeenCalledWith(updateInputExpected);
});