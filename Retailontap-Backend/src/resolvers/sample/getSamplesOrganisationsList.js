import { response, validateForm } from '../../utils/functions';
import { Sample, User, Organisation } from '../../../models';

export default {
  Mutation: {
    samplesOrganisations: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-samples-organisations',
          'Validation failed!',
          422,
          errors
        );
      }

      let conditionSample;
      let aliasSample;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasSample = 'supplierSample';
        conditionSample = {
          retailer_id: context.authUser.id,
        };
      } else {
        aliasSample = 'retailerSample';
        conditionSample = {
          supplier_id: context.authUser.id,
        };
      }
      if (args.project_id) {
        conditionSample['project_id'] = args.project_id;
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
                  model: Sample,
                  as: aliasSample,
                  where: conditionSample,
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
