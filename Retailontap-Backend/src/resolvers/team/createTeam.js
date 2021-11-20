import { response, validateForm } from '../../utils/functions';
import { Organisation, Team, UserTeamRole, User } from '../../../models';

export default {
  Mutation: {
    createTeam: async (parent, args, context) => {
      let errors = null;

      args.administrators = JSON.parse(JSON.stringify(args.administrators));

      const validationRule = {
        name: 'required|string',
        description: 'required|string',
        administrators: 'required',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('create-team', 'Validation failed!', 422, errors);
      }

      const team = await Team.create({
        name: args.name,
        description: args.description,
        organisation_id: context.authUser.organisation[0].id,
      });

      args.administrators.map(async (admin) => {
        //cheke if the user id from this organisation
        const user = await User.findOne({
          where: {
            id: admin.id,
          },
          include: [
            {
              model: Organisation,
              as: 'organisation',
              attributes: ['id', 'name', 'deleted_at'],
              paranoid: false,
              where: {
                id: context.authUser.organisation[0].id,
              },
            },
          ],
        });

        if (user) {
          await UserTeamRole.create({
            user_id: admin.id,
            team_id: team.id,
            role_id: 1,
          });
        }
      });

      return response('create-team', 'Team created successfully', 200, null);
    },
  },
};
