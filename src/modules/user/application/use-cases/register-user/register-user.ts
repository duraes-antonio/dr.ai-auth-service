import {AddUserOutput, RegisterUser} from '../../../core/use-cases/register-user/register-user';
import {RequiredError} from '../../../../../core/errors/required';

const RegisterUserCase: RegisterUser = (input): AddUserOutput => {

	if (!input) {
		throw new RequiredError('input');
	}

	return undefined
}

export {RegisterUserCase}
