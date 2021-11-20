import { sequelize } from '../../utils/variables';

const { Op } = require('sequelize');
import {
  Product,
  Project,
  Sample,
  User,
  Image,
  Organisation,
  Country,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    filterSample: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        retailerOrSupplierId: 'integer',
        date_start: 'string',
        date_end: 'string',
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('filter-sample', 'Validation failed!', 422, errors);
      }
      let conditionSample;
      let aliasUser;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasUser = 'supplier';
        conditionSample = {
          retailer_id: context.authUser.id,
        };
      } else {
        aliasUser = 'retailer';
        conditionSample = {
          supplier_id: context.authUser.id,
        };
      }
      if (args.date_end && args.date_start) {
        conditionSample['received_date'] = {
          [Op.and]: {
            [Op.gte]: args.date_start,
            [Op.lte]: args.date_end,
          },
        };
      } else if (args.date_start) {
        conditionSample['received_date'] = sequelize.where(
          sequelize.fn('date', sequelize.col('Sample.received_date')),
          '=',
          args.date_start
        );
      }
      if (args.retailerOrSupplierId) {
        conditionSample[`$${aliasUser}->organisation.id$`] =
          args.retailerOrSupplierId;
      }
      if (args.project_id) {
        conditionSample['project_id'] = args.project_id;
      }
      return Sample.findAll({
        where: conditionSample,
        attributes: ['id', 'received_date', 'track_number'],
        include: [
          {
            model: Project,
            as: 'project',
            attributes: ['id', 'name'],
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'description', 'name'],
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
            ],
          },
          {
            model: Image,
            as: 'sample_image',
            attributes: ['id', 'thumbnail'],
          },
          {
            model: User,
            as: aliasUser,
            attributes: ['id', 'first_name', 'last_name', 'work_email'],
            include: [
              {
                model: Image,
                as: 'image',
                attributes: ['thumbnail'],
              },
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
                include: [
                  {
                    model: Country,
                    as: 'country',
                    attributes: ['id', 'name'],
                  },
                ],
              },
            ],
          },
        ],
      });
    },
  },
};
