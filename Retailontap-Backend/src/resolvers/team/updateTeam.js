import { Team } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    updateTeam: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
        name: 'required|string',
        description: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('update-team', 'Validation failed!', 422, errors);
      }

      const team = await Team.update(
        {
          ...args,
        },
        {
          where: {
            id: args.id,
            organisation_id: context.authUser.organisation[0].id,
          },
        }
      );
      if (team[0] === 1) {
        return {
          path: 'update-team',
          message: 'Team updated successfully!',
          code: 200,
          errors: null,
        };
      }
      return {
        path: 'update-team',
        message: 'Team update failed!',
        code: 400,
        errors: null,
      };
    },
  },
};
