import Validator from 'validator';
import isEmpty from 'is-empty';

function validateSuggestionInput(data) {
  const errors = {};
  const dataCopy = { ...data };
  // Convert empty fields to an empty string so we can use validator functions
  dataCopy.contributorName = !isEmpty(dataCopy.contributorName) ? dataCopy.contributorName : '';
  dataCopy.contributorEmail = !isEmpty(dataCopy.contributorEmail) ? dataCopy.contributorEmail : '';
  dataCopy.contributorTeam = !isEmpty(dataCopy.contributorTeam) ? dataCopy.contributorTeam : '';
  dataCopy.category = !isEmpty(dataCopy.category) ? dataCopy.category : '';
  dataCopy.description = !isEmpty(dataCopy.description) ? dataCopy.description : '';
  dataCopy.personDayCurrent = !isEmpty(dataCopy.personDayCurrent) ? dataCopy.personDayCurrent : '';
  dataCopy.personDayFuture = !isEmpty(dataCopy.personDayFuture) ? dataCopy.personDayFuture : '';
  dataCopy.cost = !isEmpty(dataCopy.cost) ? dataCopy.cost : '';
  dataCopy.title = !isEmpty(dataCopy.title) ? dataCopy.title : '';

  // Name checks
  if (Validator.isEmpty(dataCopy.contributorName)) {
    errors.contributorName = 'Name field is required';
  }

  // Email checks
  if (Validator.isEmpty(dataCopy.contributorEmail)) {
    errors.contributorEmail = 'Email field is required';
  } else if (!Validator.isEmail(dataCopy.contributorEmail)) {
    errors.contributorEmail = 'Email is invalid';
  }

  if (Validator.isEmpty(dataCopy.contributorTeam)) {
    errors.contributorTeam = 'Team field is required';
  }

  if (Validator.isEmpty(dataCopy.category)) {
    errors.category = 'Category field is required';
  }

  if (Validator.isEmpty(dataCopy.description)) {
    errors.description = 'Description field is required';
  }

  if (Validator.isEmpty(dataCopy.title)) {
    errors.title = 'Title field is required';
  }

  if (!Validator.isEmpty(dataCopy.personDayCurrent) && !Validator.isInt(dataCopy.personDayCurrent)) {
    errors.personDayCurrent = 'Current person per day must be a number';
  }

  if (!Validator.isEmpty(dataCopy.personDayFuture) && !Validator.isInt(dataCopy.personDayFuture)) {
    errors.personDayFuture = 'Future person per day must be a number';
  }

  if (!Validator.isEmpty(dataCopy.cost) && !Validator.isInt(dataCopy.cost)) {
    errors.cost = 'Cost must be a number';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateSuggestionInput;
