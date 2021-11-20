import { response, validateForm } from '../../../utils/functions';
import { User } from '../../../../models';
import * as UserService from '../../../utils/service/UserService';

export default {
  Mutation: {
    resendInviteToInternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        work_email: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'resend-invite-to-internal-user',
          'Validation failed!',
          422,
          errors
        );
      }

      const user = await User.findOne({
        where: {
          work_email: args.work_email,
        },
      });

      if (user) {
        const isResendInvitation = await UserService.resendInviteToInternalUser(
          user,
          context
        );
        if (isResendInvitation) {
          return response(
            'resend-invite-to-internal-user',
            'Invitation sent successfully',
            200,
            null
          );
        } else {
          return response(
            'resend-invite-to-internal-user',
            'Send invitation failed',
            400,
            null
          );
        }
      } else {
        return response(
          'resend-invite-to-internal-user',
          'User not found',
          400,
          null
        );
      }
    },
  },
};
