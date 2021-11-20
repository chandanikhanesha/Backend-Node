import sequelize from 'sequelize';
import * as OrganisationService from '../../../utils/service/OrganisationService';
import { response, validateForm } from '../../../utils/functions';
const Op = sequelize.Op;

export default {
  Mutation: {
    searchExternalOrganisations: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        searchValue: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'search-external-organisation',
          'Validation failed!',
          422,
          errors
        );
      }
      let allExternalOrganisations = [];
      let externalUsersOrganisationsIds = [];
      let condition = {};
      let organisation = null;

      //if auth user role is 3 standard
      if (context.authUser.role[0].id === 3) {
        let userCondition = {
          id: context.authUser.id,
        };
        const searchCondition = { userCondition };
        //Get External Users List
        const users = await OrganisationService.getExternalUsers(
          searchCondition
        );

        if (users && users.externalUsers && users.externalUsers.length > 0) {
          externalUsersOrganisationsIds = users.externalUsers.map(
            (user) => user.organisation[0].id
          );

          condition = {
            id: { [Op.in]: externalUsersOrganisationsIds },
          };
        }
      }

      if (
        context.authUser.role[0].id === 3 &&
        externalUsersOrganisationsIds.length === 0
      ) {
        allExternalOrganisations = [];
      } else {
        //search organistaions
        const organisationOwnerProperties = [
          'first_name',
          'last_name',
          'work_email',
        ];
        const organisationProperties = ['name', 'work_phone'];
        const organisationOwnerSearchCondition = organisationOwnerProperties.map(
          (property) => {
            return {
              [`$externalOrganisations->user.${property}$`]: {
                [Op.iLike]: '%' + args.searchValue + '%',
              },
            };
          }
        );

        const organisationSearchCondition = organisationProperties.map(
          (property) => {
            return {
              [`$externalOrganisations.${property}$`]: {
                [Op.iLike]: '%' + args.searchValue + '%',
              },
            };
          }
        );
        const searchCondition = {
          organisationOwnerSearchCondition,
          organisationSearchCondition,
          externalOrganisationCondition: condition,
          organisationIdCondition: {
            id: context.authUser.organisation[0].id,
          },
        };

        organisation = await OrganisationService.getExternalOrganisations(
          searchCondition
        );
      }
      if (organisation && organisation.externalOrganisations) {
        allExternalOrganisations = organisation.externalOrganisations;
      }
      return {
        path: 'search-external-organisation',
        message: 'Search external organisation',
        code: 200,
        errors: null,
        searchExternalOrganisations: allExternalOrganisations,
      };
    },
  },
};
