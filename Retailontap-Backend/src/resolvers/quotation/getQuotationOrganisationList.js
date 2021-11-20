import { response, validateForm } from '../../utils/functions';
import { User, Organisation, Quotation } from '../../../models';

export default {
  Mutation: {
    quotationsOrganisations: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-quotation-organisation',
          'Validation failed!',
          422,
          errors
        );
      }

      let conditionQuotation;
      let aliasSample;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasSample = 'supplierQuotation';
        conditionQuotation = {
          retailer_id: context.authUser.id,
        };
      } else {
        aliasSample = 'retailerQuotation';
        conditionQuotation = {
          supplier_id: context.authUser.id,
        };
      }
      if (args.project_id) {
        conditionQuotation['project_id'] = args.project_id;
      }
      try {
        return Organisation.findAll({
          attributes: ['id', 'name'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id'],
              required: true,
              include: [
                {
                  model: Quotation,
                  as: aliasSample,
                  where: conditionQuotation,
                  required: true,
                  attributes: ['id'],
                },
              ],
            },
          ],
        });
      } catch (e) {}
    },
  },
};
