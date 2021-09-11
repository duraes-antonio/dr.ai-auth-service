import {RegisterUserCase} from './register-user';
import {RequiredError} from '../../../../../core/errors/required';

describe('Use case: Register user', function () {
	it('should throw an error if input is not received', async () => {
		expect(RegisterUserCase).toThrow(new RequiredError('input'));
	});
});
