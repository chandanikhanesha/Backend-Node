import sequelize from 'sequelize';
const Op = sequelize.Op;
import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    searchInternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        searchValue: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'search-internal-user',
          'Validation failed!',
          422,
          errors
        );
      }

      const userProperties = ['first_name', 'last_name', 'work_email'];
      const internalUserSearchCondition = userProperties.map((property) => {
        return {
          [property]: {
            [Op.iLike]: '%' + args.searchValue + '%',
          },
        };
      });
      const organisationIdCondistion = {
        id: context.authUser.organisation[0].id,
      };
      const internalUserRoleCondistion = {
        '$role.name$': {
          [Op.iLike]: '%' + args.searchValue + '%',
        },
      };
      const searchCondition = {
        organisationIdCondistion,
        internalUserSearchCondition,
        internalUserRoleCondistion,
      };

      const internalUser = await OrganisationService.getAllInternalUsers(
        searchCondition
      );
      return {
        path: 'search-internal-user',
        message: 'search internal user',
        code: 200,
        errors: null,
        searchInternalUser: internalUser,
      };
    },
  },
};
