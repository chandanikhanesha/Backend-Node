import { response, validateForm } from '../../utils/functions';
import * as auth from '../../utils/service/auth';
import { User } from '../../../models';

export default {
  Mutation: {
    changePassword: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        old_password: 'required|string',
        new_password: 'required|string',
        confirm_new_password: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('change-password', 'Validation failed!', 422, errors);
      }

      if (args.new_password === args.confirm_new_password) {
        await new Promise((resolve) => {
          // change password AWS Cognito
          auth.changePassword(
            context.authUser.uuid,
            args.old_password,
            args.new_password,
            async (err) => {
              if (err) {
                if (err.message === 'Incorrect username or password.') {
                  errors = response(
                    'change-password',
                    'Incorrect old password.',
                    400,
                    null
                  );
                } else {
                  errors = response('change-password', err.message, 400, null);
                }
              }
              resolve();
            }
          );
        });

        if (errors) {
          return errors;
        } else {
          return response(
            'change-password',
            'Password changed successfully',
            200,
            null
          );
        }
      } else {
        return response(
          'change-password',
          "Password confirmation doesn't match password",
          200,
          null
        );
      }
    },
  },
};
