import { Hashtag, Image, Product, Colour, Material } from '../../../models';
import { Op } from 'sequelize';
import * as OrganisationService from '../../utils/service/OrganisationService';

export default {
  Mutation: {
    filterSupplierExternalOrganisationProducts: async (
      parent,
      args,
      context
    ) => {
      args.organisationIds = JSON.parse(JSON.stringify(args.organisationIds));
      args.hashtagsIds = JSON.parse(JSON.stringify(args.hashtagsIds));

      let organisationIds;
      const hashtagIds = args.hashtagsIds.map(({ id }) => id);
      if (args.organisationIds && args.organisationIds.length) {
        organisationIds = args.organisationIds.map(({ id }) => id);
      } else {
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
          organisationIds = organisation.externalOrganisations.map(
            ({ id }) => id
          );
        } else {
          return {
            path: 'get-supplier-external-organisation-products',
            message: 'get supplier external organisation products success!',
            code: 200,
            errors: null,
            products: [],
          };
        }
      }
      let hashtagCondition;
      if (hashtagIds.length) {
        hashtagCondition = {
          id: {
            [Op.in]: hashtagIds,
          },
        };
      }
      const products = Product.findAll({
        where: {
          organisation_id: {
            [Op.in]: organisationIds,
          },
        },
        attributes: ['id', 'name', 'description'],
        include: [
          {
            model: Hashtag,
            as: 'hashtags',
            where: hashtagCondition || {},
          },
          {
            model: Colour,
            as: 'colours',
          },
          {
            model: Material,
            as: 'materials',
          },
          {
            model: Image,
            as: 'images',
          },
        ],
      });

      return {
        path: 'get-supplier-external-organisation-products',
        message: 'get supplier external organisation products success!',
        code: 200,
        errors: null,
        products,
      };
    },
  },
};
