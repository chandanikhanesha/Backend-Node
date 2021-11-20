import { response } from '../utils/functions';
import { User } from '../../models';
import * as auth from '../utils/service/auth';

export default {
  Mutation: {
    resendConfirmationCode: async (parent, { work_email, activation_code }) => {
      let error = null;

      const user = await User.findOne({ where: { work_email } });
      if (user) {
        await new Promise((resolve) => {
          // email verify aws cognito
          auth.resendCode(user.uuid, (res, err) => {
            if (err) {
              error = response('aws-cognito', err.message, 400);
            } else {
              resolve(true);
            }
          });
        });
      } else {
        error = response('resend-code', 'Email is not registered.', 400);
      }

      if (error !== null) return error;

      return response('resend-code', 'Confirmation code sent.', 200);
    },
  },
};
