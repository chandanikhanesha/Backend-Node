import { getUUID, response } from '../utils/functions';
import { User } from '../../models';
import * as auth from '../utils/service/auth';

export default {
  Mutation: {
    userForgotPassword: async (parent, { work_email }) => {
      let isExisting = await User.findOne({ where: { work_email } });

      if (!isExisting) {
        return response(
          'user-forgot-password',
          'If this is a valid email, check your mailbox to reset your password.',
          400,
          null
        );
      }

      const username = await getUUID(work_email);

      if (!username) {
        return response('user-forgot-password', 'Incorrect email.', 400, null);
      }

      let error = null;

      await new Promise((resolve) => {
        auth.userForgotPassword(username, (success, err) => {
          if (err) error = response('aws-cognito', err.message, 400, null);

          resolve(success);
        });
      });

      if (error !== null) return error;

      return response(
        'user-forgot-password',
        'Email sent successfully',
        200,
        null
      );
    },
  },
};
