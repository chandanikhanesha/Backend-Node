import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';

export default {
  Mutation: {
    renameGroup: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
        name: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('rename-group', 'Validation failed!', 422, errors);
      }

      const group = await Group.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      if (group) {
        group.update({ name: args.name });

        return response(
          'rename-group',
          'Group renamed successfully',
          200,
          null
        );
      } else {
        return response('rename-group', 'Rename group failed', 400, null);
      }
    },
  },
};
