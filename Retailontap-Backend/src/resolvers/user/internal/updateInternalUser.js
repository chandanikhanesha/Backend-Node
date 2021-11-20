import { response, validateForm } from '../../../utils/functions';
import * as UserService from '../../../utils/service/UserService';
import UserOrganisationRole from '../../../../models/UserOrganisationRole';
import { User } from '../../../../models';

export default {
  Mutation: {
    updateInternalUser: async (parent, args, context) => {
      let errors = [];
      let isLicenceAvailable = false;

      const validationRule = {
        id: 'required|integer',
        role_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-internal-user',
          'Validation failed!',
          422,
          errors
        );
      }

      const user = await User.findOne({
        where: {
          id: args.id,
        },
      });

      const updateRole = await UserOrganisationRole.findOne({
        where: {
          user_id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      if (
        user.is_active &&
        updateRole.role_id !== parseInt(process.env.STAKEHOLDER_ROLE_ID)
      ) {
        isLicenceAvailable = true;
      } else {
        if (args.role_id === parseInt(process.env.STAKEHOLDER_ROLE_ID)) {
          isLicenceAvailable = true;
        } else {
          isLicenceAvailable = await UserService.isLicenceAvailable(
            context.authUser.organisation[0].id
          );
        }
      }

      if (updateRole && isLicenceAvailable) {
        const roleChanged = await updateRole.update({
          role_id: args.role_id,
        });
        const internalUser = await UserService.getInternalUserById(
          args.id,
          context.authUser.organisation[0].id
        );

        return {
          path: 'update-internal-user',
          message: 'Internal user updated successfully',
          code: 200,
          errors: null,
          internalUser: internalUser,
        };
      } else {
        return {
          path: 'update-internal-user',
          message: 'Update internal user failed',
          code: 400,
          errors: null,
          internalUser: null,
        };
      }
    },
  },
};
