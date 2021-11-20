import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    copyFolderFile: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        newKey: 'required|string',
        oldKey: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'copy-folder-file',
          'Validation failed!',
          422,
          errors
        );
      }
      try {
        await MySpaceService.copyFolderFile({
          newKey: args.newKey,
          oldKey: args.oldKey,
        });
        return {
          path: 'copy-folder-file',
          message: 'Folder-file copied sucessfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'copy-folder-file',
          message: 'Folder-file copy failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
