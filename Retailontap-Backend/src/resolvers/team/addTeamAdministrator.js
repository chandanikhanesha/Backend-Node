const Promise = require('bluebird');
import { response, validateForm } from '../../utils/functions';
import { Organisation, Team, User, UserTeamRole } from '../../../models';

export default {
  Mutation: {
    addTeamAdministrator: async (parent, args, context) => {
      let errors = null;

      args.administrators = JSON.parse(JSON.stringify(args.administrators));

      const validationRule = {
        id: 'required|integer',
        administrators: 'required',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'add-team-administrator',
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
        const error = 'This team does not belong to this organisation';
        return response(
          'update-team-member',
          'Update team member failed!',
          400,
          error
        );
      }

      const existingTeamMembersIds = await UserTeamRole.findAll({
        where: {
          team_id: team.id,
        },
        attributes: ['team_id', 'user_id', 'role_id'],
      }).map(({ user_id, role_id }) => {
        return {
          user_id,
          role_id,
        };
      });

      let message = {};
      await Promise.map(args.administrators, async ({ id }) => {
        const findTeamUser = existingTeamMembersIds.find(
          ({ user_id }) => user_id === id
        );
        if (findTeamUser && findTeamUser.role_id === 0) {
          const update = await UserTeamRole.update(
            {
              role_id: 1,
            },
            {
              where: {
                user_id: id,
              },
            }
          );

          if (update[0] !== 0) {
            message[id] = 'success';
          } else {
            message[id] = 'failed';
          }
        } else if (!findTeamUser) {
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
            const create = await UserTeamRole.create({
              user_id: id,
              team_id: team.id,
              role_id: 1,
            });
            if (create) {
              message[id] = 'success';
            } else {
              message[id] = 'failed';
            }
          } else {
            message[id] = 'This user does not belong to this organisation';
          }
        } else {
          message[id] = 'This user is already an administrator';
        }
      });
      message = JSON.parse(JSON.stringify(message));

      return response(
        'add-team-administrator',
        'Administrator added successfully!',
        200,
        message
      );
    },
  },
};
