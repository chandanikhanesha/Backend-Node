import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    getExternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-external-user', 'Validation failed!', 422, errors);
      }
      let externalUserCondition = { id: args.id };
      const searchCondition = {
        externalUserCondition,
      };
      const externalUser = await OrganisationService.searchAllExternalUsers(
        context,
        searchCondition
      );
      return {
        path: 'get-external-user',
        message: 'Get external user',
        code: 200,
        errors: null,
        user: externalUser[0],
      };
    },
  },
};
