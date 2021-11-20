import { response, validateForm } from '../../../utils/functions';
import { Connection } from '../../../../models';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    resendInviteToExternalOrganisation: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        work_email: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'resend-invite-to-external-organisation',
          'Validation failed!',
          422,
          errors
        );
      }

      const organisation = await OrganisationService.getOrganisationByEmail(
        args.work_email
      );

      if (organisation) {
        const connection = await Connection.findOne({
          where: {
            from: organisation.id,
            to: context.authUser.organisation[0].id,
            model: 'Organisation',
          },
        });

        if (connection) {
          const isResendInvitation = await OrganisationService.resendInviteToExternalOrganisation(
            organisation,
            context,
            connection
          );

          if (isResendInvitation) {
            return response(
              'resend-invite-to-external-organisation',
              'Invitation sent successfully',
              200,
              null
            );
          } else {
            return response(
              'resend-invite-to-external-organisation',
              'Send invitation failed',
              400,
              null
            );
          }
        } else {
          return response(
            'resend-invite-to-external-organisation',
            'Connection not found',
            400,
            null
          );
        }
      } else {
        return response(
          'resend-invite-to-external-organisation',
          'Organisation not found',
          400,
          null
        );
      }
    },
  },
};
