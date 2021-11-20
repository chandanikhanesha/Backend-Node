import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    getExternalOrganisationMembers: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-external-organisation-members',
          'Validation failed!',
          422,
          errors
        );
      }

      const members = await OrganisationService.getExternalOrganisationMembers(
        context,
        args.id
      );

      return {
        path: 'get-external-organisation-members',
        message: 'Get external organisation members',
        code: 200,
        errors: null,
        members: members,
      };
    },
  },
};
