import { response } from '../../utils/functions';
import { User } from '../../../models';
import AWS from 'aws-sdk';

export default {
  Mutation: {
    deleteUserForTest: async (parent, { work_email }) => {
      let error = null;

      const user = await User.findOne({ where: { work_email } });
      if (user) {
        const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

        await new Promise((resolve) => {
          cognitoidentityserviceprovider.adminDeleteUser(
            {
              UserPoolId: `${process.env.COGNITO_POOL_ID}`,
              Username: user.uuid,
            },
            (err, data) => {
              if (err) errors.push(errorMessage('aws-cognito', err.message));

              resolve(true);
            }
          );
        });
      } else {
        error = response('delete-user', 'Email is not registered.', 400);
      }

      user.destroy();

      if (error !== null) return error;

      return response('delete-user', 'User deleted successfully.', 200);
    },
  },
};
