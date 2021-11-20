import { Organisation, Role, User } from '../../../models';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export default {
  Mutation: {
    searchForOwner: async (parent, args, context) => {
      const users = await User.findAll({
        where: {
          work_email: {
            [Op.substring]: args.work_email,
          },
        },
        attributes: ['work_email'],
        include: [
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
            where: {
              [Op.or]: [{ id: 2 }, { id: 3 }],
            },
          },
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name'],
            where: {
              id: context.authUser.organisation[0].id,
            },
          },
        ],
      });

      return {
        path: 'search-for-owner',
        message: 'Success',
        code: 200,
        errors: null,
        users: users,
      };
    },
  },
};
