import { response, validateForm } from '../../utils/functions';
import { Team, User } from '../../../models';

export default {
  Mutation: {
    getTeam: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-team', 'Validation failed!', 422, errors);
      }

      const team = await Team.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
        include: [
          {
            model: User,
            as: 'members',
          },
        ],
      });

      if (team) {
        return {
          path: 'get-team',
          message: 'Team item',
          code: 200,
          errors: null,
          team: team,
        };
      } else {
        return response('get-team', 'Team item not found', 400, null);
      }
    },
  },
};
