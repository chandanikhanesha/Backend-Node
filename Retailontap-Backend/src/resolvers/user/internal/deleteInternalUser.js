import { response, validateForm } from '../../../utils/functions';
import { Connection, User } from '../../../../models';
import * as auth from '../../../utils/service/auth';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export default {
  Mutation: {
    deleteInternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
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

      const user = await User.findByPk(args.id);
      if (user) {
        if (!args.assign_to) {
          // delete user from AWS Cognito
          const isDeleted = await auth.deleteUser(user.uuid);
          if (isDeleted) {
            const destroy = await user.destroy();

            if (destroy) {
              return {
                path: 'delete-internal-user',
                message: 'User deleted successfully',
                code: 200,
              };
            } else {
              return {
                path: 'delete-internal-user',
                message: 'User not deleted',
                code: 400,
              };
            }
          } else {
            return {
              path: 'delete-internal-user',
              message: 'User not deleted from cognito',
              code: 400,
            };
          }
        } else {
          //  assign user data to another user
          //  assign external connections
          const assignTo = await User.findByPk(args.assign_to);

          if (assignTo) {
            const externalUsers = await Connection.findAll({
              where: {
                model: 'User',
                [Op.or]: [{ from: args.id }, { to: args.id }],
              },
            });

            //assign external users
            externalUsers.map(async (item) => {
              if (
                (item.from === args.id && item.to === assignTo.id) ||
                (item.to === args.id && item.from === assignTo.id)
              ) {
                await item.destroy();
              } else {
                if (item.from === args.id) {
                  await item.update({ from: assignTo.id });
                } else if (item.to === args.id) {
                  await item.update({ to: assignTo.id });
                }
              }
            });

            const externalOrganisations = await Connection.findAll({
              where: {
                // model: 'Organisation',
                invited_by: args.id,
              },
            });

            //assign external organisations
            externalOrganisations.map(async (item) => {
              await item.update({ invited_by: assignTo.id });
            });

            //  TODO Later if user will have other data we will assign them too

            const isDeleted = await auth.deleteUser(user.uuid);
            if (isDeleted) {
              await user.destroy();
            }

            return {
              path: 'delete-internal-user',
              message:
                'User deleted and data assigned to other user successfully',
              code: 200,
            };
          } else {
            return {
              path: 'delete-internal-user',
              message: 'Assign to user not found',
              code: 400,
            };
          }
        }
      } else {
        return {
          path: 'delete-internal-user',
          message: 'User not found',
          code: 400,
        };
      }
    },
  },
};
