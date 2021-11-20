import {
  generateRandomString,
  response,
  validateForm,
} from '../../../utils/functions';
import { Connection } from '../../../../models';

export default {
  Mutation: {
    disconnectExternalOrganisation: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'disconnect-external-organisation',
          'Validation failed!',
          422,
          errors
        );
      }

      const ifConnectionFromExist = await Connection.findOne({
        where: {
          from: context.authUser.organisation[0].id,
          to: args.id,
          model: 'Organisation',
        },
      });

      const ifConnectionToExist = await Connection.findOne({
        where: {
          from: args.id,
          to: context.authUser.organisation[0].id,
          model: 'Organisation',
        },
      });

      if (ifConnectionFromExist && ifConnectionToExist) {
        const disconnectFrom = ifConnectionFromExist.destroy();
        const disconnectTo = ifConnectionToExist.destroy();
        if (disconnectFrom && disconnectTo) {
          return response(
            'disconnect-external-organisation',
            'External organisation disconnected successfully',
            200,
            null
          );
        } else {
          return response(
            'disconnect-external-organisation',
            'Disconnect external organisation failed',
            200,
            null
          );
        }
      } else {
        return response(
          'disconnect-external-organisation',
          'Connection not found',
          400,
          null
        );
      }
    },
  },
};
