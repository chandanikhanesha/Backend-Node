import { User, Team } from '../../../models';

export default {
  Query: {
    teams: async (parent, args, context) => {
      return Team.findAll({
        where: {
          organisation_id: context.authUser.organisation[0].id,
        },
        include: [
          {
            model: User,
            as: 'members',
          },
        ],
      });
    },
  },
};
