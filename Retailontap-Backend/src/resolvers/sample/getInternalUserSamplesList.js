import { response, validateForm } from '../../utils/functions';
import * as SampleService from '../../utils/service/SampleService';
import * as OrganisationService from '../../utils/service/OrganisationService';

export default {
  Query: {
    getInternalUserSamples: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        userId: 'required|integer',
      };
      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-internal-user-sample',
          'Validation failed!',
          422,
          errors
        );
      }
      const sampleCondition = {
        aliasUser: '',
        sample: {},
      };
      const type = context.authUser.organisation[0].organisation_type;
      const organisationIdCondistion = {
        id: context.authUser.organisation[0].id,
      };
      const searchCondition = {
        organisationIdCondistion,
      };
      let internalUser = null;
      const allInternalUsers = await OrganisationService.getAllInternalUsers(
        searchCondition
      );
      allInternalUsers.map((user) => {
        if (user.id === args.userId) {
          internalUser = true;
        }
      });
      if (internalUser) {
        if (type === 'retailer') {
          sampleCondition.aliasUser = 'supplier';
          sampleCondition.sample = {
            retailer_id: args.userId,
          };
        }
        try {
          const samples = await SampleService.getSamples({
            condition: sampleCondition,
          });
          return {
            path: 'get-internal-user-sample',
            message: 'Internal user sample successfully get!',
            code: 200,
            errors: '',
            samples,
          };
        } catch (e) {
          return {
            path: 'get-internal-user-order',
            message: 'Get Internal user sample failed!',
            code: 400,
            errors: '',
            orders: null,
          };
        }
      } else {
        return {
          path: 'get-internal-user-sample',
          message: 'Get Internal user sample failed!',
          code: 400,
          errors: 'There is not internal user',
          orders: null,
        };
      }
    },
  },
};
