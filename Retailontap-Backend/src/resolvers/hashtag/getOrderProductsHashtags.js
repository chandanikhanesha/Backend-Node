import {
  Hashtag,
  Order,
  Product,
  Project,
  Quotation,
  QuotationItems,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    orderProductsHashtags: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-order-product-hashtags',
          'Validation failed!',
          422,
          errors
        );
      }
      let conditionQuotation;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        conditionQuotation = {
          retailer_id: context.authUser.id,
        };
      } else {
        conditionQuotation = {
          supplier_id: context.authUser.id,
        };
      }
      if (args.project_id) {
        conditionQuotation['project_id'] = args.project_id;
      }
      return Hashtag.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: Product,
            as: 'productHashtags',
            attributes: ['id'],
            required: true,
            // include: [
            //   {
            //     model: Project,
            //     as: 'projectProduct',
            //     attributes: ['id'],
            //     required: true,
            //     include: [
            //       {
            //         model: Quotation,
            //         as: 'quotation',
            //         attributes: ['id'],
            //         where: conditionQuotation,
            //         required: true,
            //         include: [
            //           {
            //             model: QuotationItems,
            //             as: 'items',
            //             required: true,
            //             include: [
            //               {
            //                 model: Order,
            //                 as: 'order',
            //                 required: true,
            //               },
            //             ],
            //           },
            //         ],
            //       },
            //     ],
            //   },
            // ],
          },
        ],
      });
    },
  },
};
