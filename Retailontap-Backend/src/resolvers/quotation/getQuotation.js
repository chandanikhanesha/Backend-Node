import {
  Quotation,
  Project,
  User,
  Product,
  Organisation,
  ProductItem,
  QuotationItems,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    quotation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-quotation', 'Validation failed!', 422, errors);
      }
      let conditionQuotation;
      let aliasUser;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasUser = 'supplier';
        conditionQuotation = {
          retailer_id: context.authUser.id,
          id: args.id,
        };
      } else {
        aliasUser = 'retailer';
        conditionQuotation = {
          supplier_id: context.authUser.id,
          id: args.id,
        };
      }
      try {
        return Quotation.findOne({
          where: conditionQuotation,
          attributes: ['id', 'delivery_date', 'transportation_type'],
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id'],
              include: [
                {
                  model: Product,
                  as: 'product',
                  attributes: ['id', 'name', 'description'],
                },
              ],
            },
            {
              model: QuotationItems,
              as: 'items',
              attributes: ['id', 'quotation_id', 'quantity'],
              include: [
                {
                  model: ProductItem,
                  as: 'productItem',
                  attributes: [
                    'id',
                    'title',
                    'style',
                    'colour',
                    'size',
                    'unit_price',
                  ],
                },
              ],
            },
            {
              model: User,
              as: aliasUser,
              attributes: ['id'],
              include: [
                {
                  model: Organisation,
                  as: 'organisation',
                  attributes: ['id', 'name'],
                },
              ],
            },
          ],
        });
      } catch (e) {
        return {};
      }
    },
  },
};
