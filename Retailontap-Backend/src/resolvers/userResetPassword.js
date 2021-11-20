import { getUUID, response } from '../utils/functions';
import * as auth from '../utils/service/auth';

export default {
  Mutation: {
    userResetPassword: async (parent, { work_email, uuid, new_password, code }) => {
      let username;

      if(work_email !== '-')
          username = await getUUID(work_email);
      else
          username = uuid;

      if (!username) {
        return response('reset-password', 'Incorrect email.', 400, null);
      }

      let error = null;

      await new Promise((resolve) => {
        auth.userResetPassword(username, new_password, code, (success, err) => {
          if (err) error = response('aws-cognito', err.message, 400, null);

          resolve(success);
        });
      });

      if (error !== null) return error;

      return response(
        'reset-password',
        'Password reset successfully',
        200,
        null
      );
    },
  },
};
