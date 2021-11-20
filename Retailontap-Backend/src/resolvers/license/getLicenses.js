import { License, Price, Tier } from '../../../models';

export default {
  Query: {
    licenses: async () => {
      return License.findAll({
        include: [
          {
            model: Price,
            as: 'prices',
            include: [
              {
                model: Tier,
                as: 'tiers',
              },
            ],
          },
        ],
      });
    },
  },
};
