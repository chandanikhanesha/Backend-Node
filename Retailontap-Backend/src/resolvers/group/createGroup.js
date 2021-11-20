import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';

export default {
  Mutation: {
    createGroup: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        name: 'required|string',
        group_type: 'required|string|in:["internal","external"]',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('create-group', 'Validation failed!', 422, errors);
      }

      let data = args;
      data.created_by = context.authUser.id;
      data.organisation_id = context.authUser.organisation[0].id;

      const group = await Group.create(data);

      if (group) {
        return response(
          'create-group',
          'Group created successfully',
          200,
          null
        );
      } else {
        return response('create-group', 'Create Group failed', 400, null);
      }
    },
  },
};
