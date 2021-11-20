import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';

export default {
  Mutation: {
    leaveTheGroup: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('leave-the-group', 'Validation failed!', 422, errors);
      }
      const group = await Group.findByPk(args.id);

      if (group) {
        const deleteUser = await group.removeUser(context.authUser.id);

        if (deleteUser) {
          return response(
            'leave-the-group',
            'You have leave the group successfully',
            200,
            null
          );
        } else {
          return response(
            'leave-the-group',
            'Leave the group failed',
            400,
            null
          );
        }
      } else {
        return response('leave-the-group', 'Leave the group failed', 400, null);
      }
    },
  },
};
