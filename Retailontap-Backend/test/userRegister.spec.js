const { getUserData, sendGraphQLRequest } = require('./utils');

const queryType = 'user-register';

describe('Authentication => User Register Test', () => {
  test('userRegister testing for the invalid email.', async () => {
    const userData = Object.assign({}, getUserData(), {
      work_email: 'john@doecom',
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'work_email',
            message: 'Please enter a valid email address.',
          },
        ],
      },
    });
  });

  test('userRegister testing for the password strength.', async () => {
    const userData = Object.assign({}, getUserData(), { password: 'johndoe' });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'aws-cognito',
            message:
              'Password did not conform with policy: Password not long enough',
          },
        ],
      },
    });
  });

  test('userRegister testing for the password strength.', async () => {
    const userData = Object.assign({}, getUserData(), { password: 'johndoee' });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'aws-cognito',
            message:
              'Password did not conform with policy: Password must have uppercase characters',
          },
        ],
      },
    });
  });

  test('userRegister testing for the password strength.', async () => {
    const userData = Object.assign({}, getUserData(), { password: 'Johndoee' });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'aws-cognito',
            message:
              'Password did not conform with policy: Password must have numeric characters',
          },
        ],
      },
    });
  });

  test('userRegister testing for the password strength.', async () => {
    const userData = Object.assign({}, getUserData(), { password: 'John1234' });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'aws-cognito',
            message:
              'Password did not conform with policy: Password must have symbol characters',
          },
        ],
      },
    });
  });

  test('userRegister testing for the email verification.', async () => {
    const userData = Object.assign({}, getUserData(), {
      work_email: 'john@doe.com',
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userRegister: [
          {
            path: 'aws-cognito',
            message: `Email address is not verified. The following identities failed the check in region EU-WEST-2: ${userData.work_email}`,
          },
        ],
      },
    });
  });
});
