import { Project, User, Organisation, Sample, Product, Image } from '../../../../models';
import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
  Mutation: {
    externalUserSampleDetails: async (parent, args, context) => {
      let errors = null;
      let projectIds = [];
          
      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-external-user-sample', 'Validation failed!', 422, errors);
      }

      let user = await User.findOne({ where: { id: args.id } });

      if (!user) {
        return {
          path: 'get-external-user-sample',
          message: 'User not found!',
          code: 400,
          errors: null
        };
      }

      let externalUserCondition = { id: args.id };
      const searchCondition = {
        externalUserCondition,
      };
      const externalUser = await OrganisationService.searchAllExternalUsers(
        context,
        searchCondition
      );

      if (!externalUser || externalUser === [] || externalUser.length === 0) {
        return {
          path: 'get-external-user-sample',
          message: 'User does not exist in your external network!',
          code: 400,
          errors: null
        };
      }

      let conditionSample;
      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {        
        conditionSample = {
          retailer_id: context.authUser.id,
          supplier_id: args.id,
        };
      } else {        
        conditionSample = {
          supplier_id: context.authUser.id,
          retailer_id: args.id,
        };
      }

      const samples = await Sample.findAll({
        where: conditionSample,
        attributes: ['id', 'received_date', 'track_number','is_submited','is_show','created_at'],
        include: [
          {
            model: Project,
            as:'project',
            attributes: ['id', 'name', 'budget'],
            where: { created_by: conditionSample.retailer_id },
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name','description'],
                include: [
                  {
                    model: Image,
                    as: 'images',
                    attributes: ['id', 'thumbnail'],
                  },
                  {
                    model: Organisation,
                    as: 'organisation',
                    attributes: ['id', 'name'],
                  },
                ]
              },
            ],
          },
          {
            model: User,
            as:'retailer',
            attributes: ['id', 'first_name', 'last_name'],
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
              },
            ]
          },
          {
            model: User,
            as:'supplier',
            attributes: ['id', 'first_name', 'last_name'],
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
              },
            ]
          }
        ]
      });

      return {
        path: 'get-external-user-sample',
        message: 'get-external-user-sample',
        code: 200,
        errors: null,
        sampledetails: samples
      }
    }
  }
}