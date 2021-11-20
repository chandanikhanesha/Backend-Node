import * as auth from '../../../utils/service/auth';
import { response, validateForm } from '../../../utils/functions';
import { User } from '../../../../models';

export default {
  Mutation: {
    refreshToken: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        refreshToken: 'required|string',
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('refresh-token', 'Validation failed!', 422, errors);
      }
      try {
        const user = await User.findOne({
          where: {
            id: args.id,
          },
        });
        const tokens = await auth.refreshToken(args.refreshToken, user.uuid);
        return {
          path: 'refresh-token',
          message: 'Refresh token retrieved successfully!',
          code: 200,
          errors: null,
          token: tokens,
        };
      } catch (e) {
        return {
          path: 'refresh-token',
          message: 'Token refresh failed!',
          code: 400,
          errors: null,
          token: null,
        };
      }
    },
  },
};
