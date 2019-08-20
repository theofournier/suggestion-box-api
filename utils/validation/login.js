import Validator from 'validator';
import isEmpty from 'is-empty';


function validateLoginInput(data) {
  const errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Name checks
  if (Validator.isEmpty(data.login)) {
    errors.login = 'Login field is required';
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateLoginInput;
