import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';
import sequelize from 'sequelize';
import * as BaseService from '../../../utils/service/BaseService';
import { User } from '../../../../models';
const Op = sequelize.Op;

export default {
  Mutation: {
    addHashtagsToExternalUser: async (parent, args, context) => {
      let errors = null;

      args.hashtags = JSON.parse(JSON.stringify(args.hashtags));

      if (!args.hashtags) {
        return response(
          'add-hashtags-to-external-user',
          'Validation failed!',
          422,
          null
        );
      }

      const validationRule = {
        externalUserId: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'add-hashtags-to-external-user',
          'Validation failed!',
          422,
          errors
        );
      }

      let externalUserCondition = { id: args.externalUserId };
      const searchCondition = {
        externalUserCondition,
      };
      const externalUser = await OrganisationService.searchAllExternalUsers(
        context,
        searchCondition
      );

      if (!externalUser) {
        return response(
          'add-hashtags-to-external-user',
          'External user not exist',
          422,
          null
        );
      }

      await BaseService.associateHashtags(
        externalUser[0],
        args.hashtags,
        'ExternalUser',
        'update'
      );

      return {
        path: 'add-hashtags-to-external-user',
        message: 'Hashtags successfully added to external user',
        code: 200,
        errors: null,
      };
    },
  },
};
