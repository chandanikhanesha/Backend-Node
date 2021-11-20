import {
  Organisation,
  Role,
  User,
  UserOrganisationRole,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    addAdministrator: async (parent, args, context) => {
      let errors = {};

      const validationRule = {
        work_email: 'required|string|email',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('change-owner', 'Validation failed!', 422, errors);
      }

      const user = await User.findOne({
        where: {
          work_email: args.work_email,
        },
        attributes: ['id', 'work_email'],
        include: [
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name'],
            where: {
              id: context.authUser.organisation[0].id,
            },
          },
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (user && user.id && user.role[0].id === 3) {
        const userOrganisationRole = await UserOrganisationRole.update(
          {
            role_id: 2, //Administrator
          },
          {
            where: {
              user_id: user.id,
              role_id: 3, //Standard
            },
          }
        );

        if (userOrganisationRole[0] === 1) {
          return response(
            'add-administrator',
            'Administrator added successfully',
            200,
            null
          );
        } else {
          return response(
            'add-administrator',
            'Add administrator failed',
            400,
            null
          );
        }
      } else {
        return response(
          'add-administrator',
          'No users with role standard found',
          400,
          null
        );
      }
    },
  },
};
