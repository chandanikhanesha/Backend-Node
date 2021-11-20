const { Op } = require('sequelize');
const Promise = require('bluebird');
import { response, validateForm } from '../../utils/functions';
import { Organisation, Team, UserTeamRole, User } from '../../../models';

export default {
  Mutation: {
    updateTeamAdministrator: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        id: 'required|integer',
      };
      args.administrators = JSON.parse(JSON.stringify(args.administrators));

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-team-administrator',
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
        const error = `This team id ${args.id} does not belong to organistion with id ${context.authUser.organisation[0].id}`;
        return response(
          'update-team-administrator',
          'Add team administrator failed!',
          400,
          error
        );
      }

      const existingTeamMembers = await UserTeamRole.findAll({
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

      const allAdministratorsIds = [];
      const newAdministrators = [];
      await Promise.map(args.administrators, async ({ id }) => {
        const findTeamUser = existingTeamMembers.find(
          ({ user_id }) => user_id === id
        );
        if (findTeamUser && findTeamUser.role_id === 1) {
          allAdministratorsIds.push(id);
        } else if (findTeamUser && findTeamUser.role_id === 0) {
          allAdministratorsIds.push(id);
          await UserTeamRole.update(
            {
              role_id: 1,
            },
            {
              where: {
                user_id: id,
                role_id: 0,
              },
            }
          );
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
            newAdministrators.push({
              user_id: id,
              team_id: team.id,
              role_id: 1,
            });
          }
        }
      });
      const newTeamAdministrator = await UserTeamRole.bulkCreate(
        newAdministrators
      );

      newTeamAdministrator.map(({ UserId }) => {
        allAdministratorsIds.push(UserId);
      });

      await UserTeamRole.destroy({
        where: {
          user_id: { [Op.notIn]: allAdministratorsIds },
          team_id: team.id,
          role_id: 1,
        },
      });

      return response(
        'update-team-administrator',
        'Update team administrator success!',
        200,
        ''
      );
    },
  },
};
