import { response, validateForm } from '../../utils/functions';
import { Organisation, Team, UserTeamRole, User } from '../../../models';

export default {
  Mutation: {
    addTeamMember: async (parent, args, context) => {
      let errors = {};
      let isValid = true;
      const validationRule = {
        user_id: 'required|integer',
        team_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('add-team-member', 'Validation failed!', 422, errors);
      }
      const { team_id, user_id } = args;
      const team = await Team.findOne({
        where: {
          id: team_id,
          organisation_id: context.authUser.organisation[0].id,
        },
        attributes: ['id', 'organisation_id'],
      });
      if (!team || !team.id) {
        isValid = false;
        errors.team_id = `This Team ${team_id} does not belong to organisation with id ${context.authUser.organisation[0].id}`;
      }
      const user = await User.findOne({
        where: {
          id: user_id,
        },
        attributes: ['id'],
        include: [
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id'],
            where: {
              id: context.authUser.organisation[0].id,
            },
          },
        ],
      });
      if (!user || !user.id) {
        isValid = false;
        errors.user_id = `User id ${user_id} does not belong to organisation with id ${context.authUser.organisation[0].id}`;
      }

      if (!isValid) {
        return response(
          'add-team-member',
          'Validation failed!',
          400,
          JSON.stringify(errors)
        );
      }
      const userExist = await UserTeamRole.findOne({
        where: {
          user_id,
          team_id,
        },
      });
      if (!userExist) {
        const userTeamRole = await UserTeamRole.create({
          user_id,
          team_id,
          role_id: 0,
        });

        if (userTeamRole) {
          return response(
            'add-team-member',
            'Member added successfully',
            200,
            null
          );
        } else {
          return response('add-team-member', 'Add member failed!', 400, null);
        }
      }

      return response(
        'add-team-member',
        `User id ${user_id} is already a member`,
        200,
        null
      );
    },
  },
};
