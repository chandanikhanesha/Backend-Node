import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';

export default {
  Mutation: {
    deleteGroup: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('delete-group', 'Validation failed!', 422, errors);
      }

      const group = await Group.destroy({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      if (group) {
        return response(
          'delete-group',
          'Group deleted successfully',
          200,
          null
        );
      } else {
        return response('delete-group', 'Delete group failed', 400, null);
      }
    },
  },
};
