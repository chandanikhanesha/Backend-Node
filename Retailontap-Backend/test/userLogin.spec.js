const { getUserData, sendGraphQLRequest } = require('./utils');

const queryType = 'user-login';

describe('Authentication => User LogIn Test', () => {
  test('userLogIn testing for the invalid email.', async () => {
    const userData = Object.assign({}, getUserData(), {
      work_email: 'john@doecom',
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userLogIn: {
          path: 'aws-cognito',
          message: 'Incorrect username or password.',
        },
      },
    });
  });

  test('userLogIn testing for the invalid password.', async () => {
    const userData = Object.assign({}, getUserData(), { password: 'password' });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userLogIn: {
          path: 'aws-cognito',
          message: 'Incorrect username or password.',
        },
      },
    });
  });

  test('userLogIn testing for the correct credentials.', async () => {
    const userData = Object.assign({}, getUserData());

    const response = await sendGraphQLRequest(userData, queryType);

    const c_response = Object.assign({}, response);
    c_response.data.userLogIn.message = null;

    expect(c_response).toEqual({
      data: { userLogIn: { path: 'token', message: null } },
    });
  });
});
