import { UpdateUserCase } from './update-user';
import {
    UpdateUser,
    UserForUpdate,
} from '../../../core/repositories/user.repository';
import { UpdateUserInput } from '../../../core/use-cases/update-user';
import { FileStorage } from '../../../../../ports/file-storage/file-storage';

const FileMock = jest.fn() as jest.MockedClass<typeof File>;
const image = new FileMock([], 'mock.jpeg');

const useCaseInput: UpdateUserInput = {
    name: 'User test',
    image,
};
const imageUrl = `https://storage/${image.name}`;

const updateUserRepository = jest.fn() as jest.MockedFunction<UpdateUser>;
const fileStorage: FileStorage = {
    save: jest.fn().mockResolvedValue(imageUrl),
    delete: jest.fn(),
};

it('should call dependencies with right parameters', async () => {
    // Arrange
    const useCase = new UpdateUserCase(updateUserRepository, fileStorage);
    const updateInputExpected: UserForUpdate = {
        imageUrl,
        name: useCaseInput.name,
    };

    // Act
    await useCase.execute(useCaseInput);

    // Assert
    expect(fileStorage.save).toHaveBeenCalledTimes(1);
    expect(fileStorage.save).toHaveBeenCalledWith(image);
    expect(updateUserRepository).toHaveBeenCalledTimes(1);
    expect(updateUserRepository).toHaveBeenCalledWith(updateInputExpected);
});
