import { response, validateForm } from '../../../utils/functions';
import * as UserService from '../../../utils/service/UserService';
import { Role, User } from '../../../../models';

export default {
  Mutation: {
    checkAvailableLicense: async (parent, args, context) => {
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
          'check-available-license',
          'Validation failed!',
          422,
          errors
        );
      }

      const user = await User.findOne({
        where: {
          id: args.id,
        },
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (
        user &&
        user.role &&
        user.role[0] &&
        user.role[0].id &&
        user.is_active &&
        user.role[0].id !== parseInt(process.env.STAKEHOLDER_ROLE_ID)
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

      return {
        path: 'check-available-license',
        message: 'Check available license',
        code: 200,
        errors: null,
        license: isLicenceAvailable,
      };
    },
  },
};
