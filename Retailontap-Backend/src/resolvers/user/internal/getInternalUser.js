import { response, validateForm } from '../../../utils/functions';
import * as UserService from '../../../utils/service/UserService';

export default {
  Mutation: {
    getInternalUser: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-internal-user', 'Validation failed!', 422, errors);
      }

      const internalUser = await UserService.getInternalUserById(
        args.id,
        context.authUser.organisation[0].id
      );

      return {
        path: 'invite-identity',
        message: 'Invite identity',
        code: 200,
        errors: null,
        internalUser: internalUser,
      };
    },
  },
};
