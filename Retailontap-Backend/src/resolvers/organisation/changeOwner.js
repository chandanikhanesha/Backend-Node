import {
  Organisation,
  Role,
  User,
  UserOrganisationRole,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export default {
  Mutation: {
    changeOwner: async (parent, args, context) => {
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

      if (
        (user && user.id && user.role && user.role[0].id === 2) ||
        user.role[0].id === 3
      ) {
        const userOrganisationRole = await UserOrganisationRole.update(
          {
            role_id: 1, //Owner
          },
          {
            where: {
              user_id: user.id,
              [Op.or]: [{ role_id: 2 }, { role_id: 3 }], //Standard or Administrator
            },
          }
        );

        if (userOrganisationRole[0] === 1) {
          await UserOrganisationRole.update(
            {
              role_id: 3, //Standard
            },
            {
              where: {
                user_id: context.authUser.id,
                role_id: 1,
              },
            }
          );

          return response(
            'change-owner',
            'Owner changed successfully',
            200,
            null
          );
        } else {
          return response('change-owner', 'Change owner failed', 400, null);
        }
      } else {
        return response('change-owner', 'User not found', 400, null);
      }
    },
  },
};
