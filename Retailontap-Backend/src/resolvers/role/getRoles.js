import { Role } from '../../../models';
import sequelize from 'sequelize';

export default {
  Query: {
    roles: async () => {
      return Role.findAll({
        where: {
          id: {
            [sequelize.Op.ne]: 1,
          },
        },
      });
    },
  },
};
