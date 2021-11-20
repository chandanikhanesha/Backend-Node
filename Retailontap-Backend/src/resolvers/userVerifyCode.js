import { response } from '../utils/functions';
import { User } from '../../models';
import * as auth from '../utils/service/auth';

// userVerifyCode Resolver
export default {
  Mutation: {
    userVerifyCode: async (parent, { work_email, activation_code }) => {
      let error = null;

      const user = await User.findOne({ where: { work_email } });
      if (user) {
        await new Promise((resolve) => {
          // email verify aws cognito
          auth.userEmailVerifyCode(
            user.uuid,
            activation_code,
            async (res, err) => {
              if (err) {
                error = response('aws-cognito', err.message, 400);
              } else if (
                res.code === 'ExpiredCodeException' ||
                res.code === 'CodeMismatchException'
              ) {
                error = response('aws-cognito11', res.message, 400);
              } else {
                //change user email to verified
                const userAttributes = [
                  {
                    Name: 'email_verified',
                    Value: 'true',
                  },
                ];
                await auth.adminChangeUserAttributes(user.uuid, userAttributes);
                //change user activated in out DB
                user.activated = true;
                user.save();
              }
              resolve(true);
            }
          );
        });
      } else {
        error = response('user-verify-code', 'Email is not registered.', 400);
      }

      if (error !== null) return error;

      return response('user-verify-code', 'Email verified successfully.', 200);
    },
  },
};
