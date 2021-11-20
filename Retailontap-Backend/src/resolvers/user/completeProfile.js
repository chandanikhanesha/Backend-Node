import { response, validateForm } from '../../utils/functions';
import * as auth from '../../utils/service/auth';

// Complete Profile Resolver
export default {
  Mutation: {
    completeProfile: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        first_name: 'required|string',
        last_name: 'required|string',
        job_title: 'required|string',
        old_password: 'required|string',
        new_password: 'required|string',
        phone_number: 'required',
        agree: 'required|boolean|agree',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('complete-profile', 'Validation failed!', 422, errors);
      }

      context.authUser.update({
        first_name: args.first_name,
        last_name: args.last_name,
        job_title: args.job_title,
        phone_number: args.phone_number,
      });

      await new Promise((resolve) => {
        // change password AWS Cognito
        auth.changePassword(
          context.authUser.uuid,
          args.old_password,
          args.new_password,
          async (err) => {
            if (err) {
              errors = response('complete-profile', err.message, 400, null);
            }
            resolve();
          }
        );
      });

      if (errors) {
        return errors;
      } else {
        return response('complete-profile', 'Complete profile done', 200, null);
      }
    },
  },
};
