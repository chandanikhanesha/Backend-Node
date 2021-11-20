import { response, validateForm } from '../../utils/functions';
import { Team } from '../../../models';

export default {
  Mutation: {
    deleteTeam: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('delete-team', 'Validation failed!', 422, errors);
      }

      const destroyTeam = await Team.destroy({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      if (destroyTeam) {
        return response('delete-team', 'Team deleted successfully.', 200, null);
      } else {
        return response('delete-team', 'Delete team failed.', 400, null);
      }
    },
  },
};
