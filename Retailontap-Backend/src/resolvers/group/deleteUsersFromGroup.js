import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';

export default {
  Mutation: {
    deleteUsersFromGroup: async (parent, args, context) => {
      let errors = null;

      args.users = JSON.parse(JSON.stringify(args.users));
      const validationRule = {
        id: 'required|integer',
        users: 'required',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'delete-user-from-group',
          'Validation failed!',
          422,
          errors
        );
      }
      const group = await Group.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      if (group) {
        let usersList = [];
        args.users.map((user) => {
          usersList.push(user.id);
        });

        const deleteUsers = await group.removeUsers(usersList);

        if (deleteUsers) {
          return response(
            'delete-user-from-group',
            'Users deleted from group successfully',
            200,
            null
          );
        } else {
          return response(
            'delete-user-from-group',
            'Users deleted from group failed',
            400,
            null
          );
        }
      } else {
        return response(
          'delete-user-from-group',
          'Users deleted from group failed',
          400,
          null
        );
      }
    },
  },
};
