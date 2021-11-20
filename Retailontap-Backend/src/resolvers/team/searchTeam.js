import sequelize from 'sequelize';
const Op = sequelize.Op;
import { User, Team } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    searchTeam: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        searchValue: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('search-team', 'Validation failed!', 422, errors);
      }
      const teamProperty = ['name', 'description'];
      const searchCondistion = teamProperty.map((property) => {
        return {
          [property]: {
            [Op.iLike]: '%' + args.searchValue + '%',
          },
        };
      });
      const teams = await Team.findAll({
        where: {
          organisation_id: context.authUser.organisation[0].id,
          [Op.or]: [...searchCondistion],
        },
        include: [
          {
            model: User,
            as: 'members',
          },
        ],
      });
      return {
        path: 'search-team',
        message: 'Search team',
        code: 200,
        errors: null,
        teams,
      };
    },
  },
};
