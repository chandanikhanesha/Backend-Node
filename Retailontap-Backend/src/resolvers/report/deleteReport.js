import { response, validateForm } from '../../utils/functions';
import { Report } from '../../../models';

export default {
  Mutation: {
    deleteReport: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('delete-report', 'Validation failed!', 422, errors);
      }
      try {
        await Report.destroy({
          where: {
            id: args.id,
          },
        });
        return {
          path: 'delete-report',
          message: 'Report deleted successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'delete-report',
          message: 'Report delete failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
