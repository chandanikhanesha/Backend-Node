import { Quotation, Project, User, Image, Organisation } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    quotations: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-quotations', 'Validation failed!', 422, errors);
      }

      let conditionQuotation;
      let aliasUser;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasUser = 'supplier';
        conditionQuotation = {
          retailer_id: context.authUser.id,
        };
      } else {
        aliasUser = 'retailer';
        conditionQuotation = {
          supplier_id: context.authUser.id,
        };
      }
      if (args.project_id) {
        conditionQuotation['project_id'] = args.project_id;
      }
      try {
        const result = await Quotation.findAndCountAll({
          where: conditionQuotation,
          distinct: true,
          attributes: ['id', 'created_at'],
          include: [
            {
              model: Project,
              as: 'project',
              attributes: ['id', 'name'],
              include: [
                {
                  model: Image,
                  as: 'images',
                  attributes: ['id', 'thumbnail'],
                  separate: true,
                  limit: 1,
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
        return {
          totalLength: result.count,
          quotations: result.rows,
        };
      } catch (e) {
        return {};
      }
    },
  },
};
