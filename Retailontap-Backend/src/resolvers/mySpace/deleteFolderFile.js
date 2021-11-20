import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    deleteFolderFile: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        key: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'delete-folder-file',
          'Validation failed!',
          422,
          errors
        );
      }
      try {
        await MySpaceService.deleteFolderFile({
          key: args.key,
        });
        return {
          path: 'delete-folder-file',
          message: 'Folder-file deleted  successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'delete-folder-file',
          message: 'Folder-file delete  failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
