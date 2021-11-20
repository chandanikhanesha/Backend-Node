import * as OrganisationService from '../../utils/service/OrganisationService';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    getAllExternalUsersByUserId: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        userId: 'required|integer',
      };
      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-internal-user-external-users',
          'Validation failed!',
          422,
          errors
        );
      }
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
          try {
          const externalUsers = await OrganisationService.getAllExternalUsersByUserId(
            context,
            args.userId
            );

            for (var i = 0; i < externalUsers.length; i++) {
                if (externalUsers[i].Connection !== undefined && externalUsers[i].Connection !== null)
                    externalUsers[i].status_id = externalUsers[i].Connection.status_id;
            }

          return {
            path: 'get-internal-user-external-users',
            message:
              'Getting external network for internal user successfuly done!',
            code: 200,
            errors: '',
            externalUsers,
          };
        } catch (e) {
          return {
            path: 'get-internal-user-external-users',
            message: 'Getting external network for internal user failed!',
            code: 400,
            errors: '',
            externalUsers: null,
          };
        }
      } else {
        return {
          path: 'get-internal-user-external-users',
          message: 'Get Internal user sample failed!',
          code: 400,
          errors: 'There is not internal user',
          externalUsers: null,
        };
      }
    },
  },
};
