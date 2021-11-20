import { response, validateForm } from '../../../utils/functions';
import { User, Connection } from '../../../../models';
import * as UserService from '../../../utils/service/UserService';

export default {
  Mutation: {
    resendInviteToExternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        work_email: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'resend-invite-to-external-user',
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
        const connection = await Connection.findOne({
          where: {
            from: user.id,
            to: context.authUser.id,
            model: 'User',
          },
        });

        if (connection) {
          const isResendInvitation = await UserService.resendInviteToExternalUser(
            user,
            context,
            connection
          );

          if (isResendInvitation) {
            return response(
              'resend-invite-to-external-user',
              'Invitation sent successfully',
              200,
              null
            );
          } else {
            return response(
              'resend-invite-to-external-user',
              'Send invitation failed',
              400,
              null
            );
          }
        } else {
          return response(
            'resend-invite-to-external-user',
            'Connection not found',
            400,
            null
          );
        }
      } else {
        return response(
          'resend-invite-to-external-user',
          'User not found',
          400,
          null
        );
      }
    },
  },
};
