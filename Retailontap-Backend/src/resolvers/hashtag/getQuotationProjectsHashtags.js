import { Hashtag, Project, Quotation } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    quotationProjectsHashtags: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-quotation-product-hashtags',
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
            model: Project,
            as: 'projectHashtags',
            attributes: ['id'],
            required: true,
            include: [
              {
                model: Quotation,
                as: 'quotation',
                attributes: ['id'],
                where: conditionQuotation,
              },
            ],
          },
        ],
      });
    },
  },
};
