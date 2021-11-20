import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    getExternalOrganisationMember: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-external-organisation-member',
          'Validation failed!',
          422,
          errors
        );
      }

      let member = await OrganisationService.getExternalOrganisationMember(
        context,
        args.id
      );

      if (!member) {
        member = null;
      }

      return {
        path: 'get-external-organisation-member',
        message: 'Get external organisation member',
        code: 200,
        errors: null,
        member: member,
      };
    },
  },
};
