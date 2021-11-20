import { Country } from '../../../models';

export default {
  Query: {
    countries: async () => {
          return Country.findAll({
              order: [['name', 'ASC']]
          });
    },
  },
};
