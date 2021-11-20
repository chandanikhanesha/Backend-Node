const { Op } = require('sequelize');
const Promise = require('bluebird');
import { response, validateForm } from '../../utils/functions';
import { Organisation, Team, UserTeamRole, User } from '../../../models';

export default {
  Mutation: {
    updateTeamMember: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        id: 'required|integer',
      };
      args.members = JSON.parse(JSON.stringify(args.members));

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-team-member',
          'Validation failed!',
          422,
          errors
        );
      }
      const team = await Team.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
        attributes: ['id', 'organisation_id'],
      });
      if (!team || !team.id) {
        const error = `This team id ${args.id} does not belong to organisation with id ${context.authUser.organisation[0].id}`;
        return response(
          'update-team-member',
          'Team member update failed!',
          400,
          error
        );
      }

      const existingTeamMembersIds = await UserTeamRole.findAll({
        where: {
          team_id: team.id,
        },
        attributes: ['team_id', 'user_id', 'role_id'],
      }).map(({ user_id }) => user_id);

      const allMembersIds = [];
      const newMembers = [];
      await Promise.map(args.members, async ({ id }) => {
        if (existingTeamMembersIds.includes(id)) {
          allMembersIds.push(id);
        } else {
          const user = await User.findOne({
            where: {
              id,
            },
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

          if (user) {
            newMembers.push({
              user_id: id,
              team_id: team.id,
              role_id: 0,
            });
          }
        }
      });
      const newTeamMember = await UserTeamRole.bulkCreate(newMembers);
      newTeamMember.map(({ UserId }) => {
        allMembersIds.push(UserId);
      });
      await UserTeamRole.destroy({
        where: {
          user_id: { [Op.notIn]: allMembersIds },
          team_id: team.id,
          role_id: 0,
        },
      });

      return response(
        'update-team-member',
        'Team member updated successfully!',
        200,
        ''
      );
    },
  },
};
