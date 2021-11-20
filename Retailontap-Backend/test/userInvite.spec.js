const { getUserData, sendGraphQLRequest } = require('./utils');

const queryType = 'user-invite';

describe('Authentication => User Invite Test', () => {
  test('userInvite testing for the invalid email.', async () => {
    let userData = getUserData();
    userData = Object.assign({}, userData, {
      work_email: 'john@doecom',
      invited_by: userData.work_email,
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userInvite: [
          {
            path: 'work_email',
            message: 'Please enter a valid email address.',
          },
        ],
      },
    });
  });

  test('userInvite testing for the unverified email.', async () => {
    let userData = getUserData();
    userData = Object.assign({}, userData, {
      work_email: 'john@doe.com',
      invited_by: userData.work_email,
    });

    const response = await sendGraphQLRequest(userData, queryType);

    expect(response).toEqual({
      data: {
        userInvite: [
          {
            path: 'aws-cognito',
            message: `Email address is not verified. The following identities failed the check in region EU-WEST-2: ${userData.work_email}`,
          },
        ],
      },
    });
  });
});
