import { Quotation, ProductItem, QuotationItems } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    quotationsItemsByProjectId: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-quotations-by-project-id',
          'Validation failed!',
          422,
          errors
        );
      }

      let conditionSample;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        conditionSample = {
          retailer_id: context.authUser.id,
          project_id: args.project_id,
        };
      } else {
        conditionSample = {
          supplier_id: context.authUser.id,
          project_id: args.project_id,
        };
      }
      return Quotation.findOne({
        where: conditionSample,
        attributes: ['id'],
        include: [
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
        ],
      });
    },
  },
};
