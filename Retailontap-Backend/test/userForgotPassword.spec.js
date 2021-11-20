const { getUserData, sendGraphQLRequest } = require('./utils');

const queryType = 'user-forgot-password';

describe('Authentication => User Forgot Password Test', () => {
  test('userForgotPassword testing for the incorrect email.', async () => {
    const userData = Object.assign({}, getUserData(), {
      work_email: 'john@doecom',
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userForgotPassword: {
          path: 'user-forgot-password',
          message: 'Email is not registered.',
        },
      },
    });
  });

  test('userForgotPassword testing for the correct email.', async () => {
    const userData = Object.assign({}, getUserData());

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({ data: { userForgotPassword: null } });
  });
});
