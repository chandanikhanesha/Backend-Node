import { sequelize } from '../../utils/variables';

const { Op } = require('sequelize');
import {
  Project,
  User,
  Image,
  Organisation,
  Quotation,
  Hashtag,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    filterQuotation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        retailerOrSupplierid: 'integer',
        date_start: 'string',
        date_end: 'string',
        total_cost: 'boolean',
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('filter-sample', 'Validation failed!', 422, errors);
      }
      let conditionQuotation;
      let aliasUser;
      let order = [];
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
      if (args.retailerOrSupplierid) {
        conditionQuotation[`$${aliasUser}->organisation.id$`] =
          args.retailerOrSupplierid;
      } else if (args.date_end && args.date_start) {
        conditionQuotation['delivery_date'] = {
          [Op.and]: {
            [Op.gte]: args.date_start,
            [Op.lte]: args.date_end,
          },
        };
      } else if (args.date_start) {
        conditionQuotation['delivery_date'] = sequelize.where(
          sequelize.fn('date', sequelize.col('Quotation.delivery_date')),
          '=',
          args.date_start
        );
      } else if (args.hashtagsIds) {
        const ids = args.hashtagsIds.map(({ id }) => id);
        conditionQuotation['$project->hashtags.id$'] = {
          [Op.in]: ids,
        };
      } else if (args.total_cost) {
        order[0] = ['total', 'DESC'];
      }

      const result = await Quotation.findAndCountAll({
        where: conditionQuotation,
        distinct: true,
        order,
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
    },
  },
};
