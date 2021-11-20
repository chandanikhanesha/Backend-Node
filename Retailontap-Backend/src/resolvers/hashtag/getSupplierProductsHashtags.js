import { Hashtag, Product } from '../../../models';
import * as OrganisationService from '../../utils/service/OrganisationService';
import { Op } from 'sequelize';

export default {
  Query: {
    supplierProductsHashtags: async (parent, args, context) => {
      const searchCondition = {
        organisationIdCondition: { id: context.authUser.organisation[0].id },
        externalOrganisationCondition: {
          organisation_type: 'supplier',
        },
      };
      const organisation = await OrganisationService.getExternalOrganisations(
        searchCondition
      );

      if (organisation && organisation.externalOrganisations) {
        const organisationIds = organisation.externalOrganisations.map(
          ({ id }) => id
        );
        const products = await Product.findAll({
          where: {
            organisation_id: {
              [Op.in]: organisationIds,
            },
          },
          attributes: ['id'],
          include: [
            {
              model: Hashtag,
              as: 'hashtags',
            },
          ],
        });
        const allHashtags = [];
        const hashtagsIds = [];
        products.map(({ hashtags }) => {
          hashtags.map((hashtag) => {
            if (!hashtagsIds.includes(hashtag.id)) {
              allHashtags.push(hashtag);
              hashtagsIds.push(hashtag.id);
            }
          });
        });
        return allHashtags;
      }
      return [];
    },
  },
};
