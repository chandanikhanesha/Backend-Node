import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';
import sequelize from 'sequelize';
const Op = sequelize.Op;

export default {
  Mutation: {
    searchExternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        searchValue: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'search-external-user',
          'Validation failed!',
          422,
          errors
        );
      }
      const userProperties = [
        'first_name',
        'last_name',
        'work_email',
        'mobile',
      ];
      const externalUserSearchCondition = userProperties.map((property) => {
        return {
          [`$externalUsers.${property}$`]: {
            [Op.iLike]: '%' + args.searchValue + '%',
          },
        };
      });

      const userSearchCondition = userProperties.map((property) => {
        return {
          [property]: {
            [Op.iLike]: '%' + args.searchValue + '%',
          },
        };
      });

      const organisationExternalUserCondition = {
        '$externalUsers->organisation.name$': {
          [Op.iLike]: '%' + args.searchValue + '%',
        },
      };
      const roleExternalUserCondition = {
        '$externalUsers->role.name$': {
          [Op.iLike]: '%' + args.searchValue + '%',
        },
      };
      const organisationUserCondition = {
        '$organisation.name$': {
          [Op.iLike]: '%' + args.searchValue + '%',
        },
      };
      const roleUserCondition = {
        '$role.name$': {
          [Op.iLike]: '%' + args.searchValue + '%',
        },
      };
      const searchCondition = {
        externalUserSearchCondition,
        userSearchCondition,
        organisationExternalUserCondition,
        roleExternalUserCondition,
        organisationUserCondition,
        roleUserCondition,
      };

      const allExternalUsers = await OrganisationService.searchAllExternalUsers(
        context,
        searchCondition
      );

      return {
        path: 'search-external-user',
        message: 'Search external user',
        code: 200,
        errors: null,
        users: allExternalUsers,
      };
    },
  },
};
