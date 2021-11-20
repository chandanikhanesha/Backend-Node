import { Organisation } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    deleteOrganisation: async (parent, args, context) => {
      let errors = {};

      const validationRule = {
        id: 'required|integer',
        name: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('change-owner', 'Validation failed!', 422, errors);
      }

      const reasons = args.reasons.map((reason) => reason.id);

      const org = await Organisation.findByPk(args.id);

      if (org && org.name === args.name) {
        try {
          //if reason is other allow message
          if (reasons.includes(8)) {
            org.update({
              delete_reason_text: args.delete_reason_text,
            });
          }

          //Attach reasons
          org.setReason(reasons);

          const destroyOrganisation = await org.destroy({
            where: {
              id: args.id,
            },
          });

          if (destroyOrganisation) {
            return response(
              'delete-organisation',
              'Organisation deleted successfully.',
              200,
              null
            );
          }
        } catch (e) {
          return response(
            'delete-organisation',
            'Delete organisation failed, organisation name is incorect.',
            400,
            null
          );
        }
      } else {
        return response(
          'delete-organisation',
          'Delete organisation failed, organisation name is incorect.',
          400,
          null
        );
      }
    },
  },
};
