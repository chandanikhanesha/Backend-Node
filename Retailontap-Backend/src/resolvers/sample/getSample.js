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
  Query: {
    sample: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-sample', 'Validation failed!', 422, errors);
      }
      let conditionSample;
      let aliasUser;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {
        aliasUser = 'supplier';
        conditionSample = {
          retailer_id: context.authUser.id,
          id: args.id,
        };
      } else {
        aliasUser = 'retailer';
        conditionSample = {
          supplier_id: context.authUser.id,
          id: args.id,
        };
      }
      if (args.project_id) {
        conditionSample['project_id'] = args.project_id;
      }
      return Sample.findOne({
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
              {
                model: Image,
                as: 'images',
                attributes: ['id', 'thumbnail'],
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
