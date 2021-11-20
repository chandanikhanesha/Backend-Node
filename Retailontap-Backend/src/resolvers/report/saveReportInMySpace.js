import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    saveReportInMySpace: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        key: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'save-report-in-my-space',
          'Validation failed!',
          422,
          errors
        );
      }
      try {
        await MySpaceService.createFile({
          key: args.key,
          files: args.files,
        });

        return {
          path: 'save-report-in-my-space',
          message: 'Report saved in My Space successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'save-report-in-my-space',
          message: 'Report save in My Space failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
