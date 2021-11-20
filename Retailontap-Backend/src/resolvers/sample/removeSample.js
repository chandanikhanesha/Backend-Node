import { response, validateForm } from '../../utils/functions';
import { Sample } from '../../../models';

export default {
  Mutation: {
    removeSample: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('remove-sample', 'Validation failed!', 422, errors);
      }

      try {
        await Sample.update(
          {
            is_show: false,
          },
          {
            where: {
              id: args.id,
            },
          }
        );
        return {
          path: 'remove-sample',
          message: 'Sample removed successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'remove-sample',
          message: 'Sample remove  failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
