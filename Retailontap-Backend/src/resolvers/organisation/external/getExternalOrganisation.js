import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    getExternalOrganisation: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-external-organisation',
          'Validation failed!',
          422,
          errors
        );
      }

      const searchCondition = {
        organisationIdCondition: {
          id: context.authUser.organisation[0].id,
        },
        externalOrganisationCondition: {
          id: args.id,
        },
      };
      const organisation = await OrganisationService.getExternalOrganisations(
        searchCondition
      );

      return {
        path: 'get-external-organisation',
        message: 'Get external organisation',
        code: 200,
        errors: null,
        organisation: organisation.externalOrganisations[0],
      };
    },
  },
};
