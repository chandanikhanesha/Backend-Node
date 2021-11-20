import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Query: {
    supplierExternalOrganisations: async (parent, args, context) => {
      const searchCondition = {
        organisationIdCondition: { id: context.authUser.organisation[0].id },
        externalOrganisationCondition: {
          organisation_type: 'supplier',
        },
      };
      const organisation = await OrganisationService.getExternalOrganisations(
        searchCondition
      );
      let externalOrganisations = [];
      if (organisation && organisation.externalOrganisations) {
        externalOrganisations = organisation.externalOrganisations;
      }
      return {
        path: 'get-supplier-external-organisation',
        message: 'Get supplier external organisation',
        code: 200,
        errors: null,
        organisations: externalOrganisations,
      };
    },
  },
};
