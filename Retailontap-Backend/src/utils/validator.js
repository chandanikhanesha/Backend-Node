import Validator from 'validatorjs';

Validator.register(
  'in',
  function (value, requirement) {
    return requirement.includes(value);
  },
  'The :attribute is not correct.'
);

Validator.register(
  'agree',
  function (value) {
    return value;
  },
  'You must agree with the Terms of service, Privacy policy and  GDPR policy.'
);

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

export default validator;
