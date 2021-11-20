import { response, validateForm } from '../../utils/functions';
import * as auth from '../../utils/service/auth';
import { User } from '../../../models';

export default {
  Mutation: {
    updateProfile: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        first_name: 'required|string',
        last_name: 'required|string',
        work_email: 'required|email',
        job_title: 'string',
        department: 'string',
        phone_number: 'string',
        mobile: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);          
          return { path: 'update-profile', message: 'Validation failed!', code: 422, errors: errors, isEmailChanged: false };
      }

      const userDetails = {
        first_name: args.first_name,
        last_name: args.last_name,
        job_title: args.job_title,
        department: args.department,
        phone_number: args.phone_number,
        mobile: args.mobile,
      };

      if (args.country_id) {
        userDetails.country_id = args.country_id;
      }

      if (args.city) {
        userDetails.city = args.city;
      }

      //update email
      if (
        args.new_work_email &&
        args.new_work_email === args.confirm_new_work_email
      ) {
        const isEmailExist = await User.findOne({
          where: {
            work_email: args.new_work_email,
          },
        });

        if (isEmailExist) {         
          return {
            path: 'update-profile',
            message: 'This email already exist',
            code: 400,
            errors: null,
            isEmailChanged:false
          };
        } else {
          //update in cognito and send the verify email message

          const userAttributes = [
            {
              Name: 'email',
              Value: args.new_work_email,
            },
            {
              Name: 'email_verified',
              Value: 'false',
            },
          ];

          const isEmailUpdated = await auth.adminChangeUserAttributes(
            context.authUser.uuid,
            userAttributes
          );

          if (isEmailUpdated) {
            userDetails.work_email = args.new_work_email;
            userDetails.activated = false;
            await context.authUser.update(userDetails);
            await new Promise((resolve) => {
              // email verify aws cognito
              auth.resendCode(context.authUser.uuid, (res, err) => {
                if (err) {
                  errors = response(
                    'update-profile',
                    'Send verify email failed',
                    400,
                    null                    
                  );
                } else {
                  resolve(true);
                }
              });
            });
            
            return {
              path: 'update-profile',
              message: 'Profile email and details updated successfully',
              code: 200,
              errors: errors,
              isEmailChanged:true
            };
          }
          //update email in our database
        }
      }

      const user = await context.authUser.update(userDetails);

      return {
        path: 'update-profile',
        message: 'Profile updated successfully',
        code: 200,
        errors: errors,
        isEmailChanged:false
      };
    },
  },
};
