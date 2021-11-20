import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    renameFolderFile: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        newKey: 'required|string',
        oldKey: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'rename-folder-file',
          'Validation failed!',
          422,
          errors
        );
      }
      try {
        await MySpaceService.renameAndMoveFolderFile({
          newKey: args.newKey,
          oldKey: args.oldKey,
        });
        return {
          path: 'rename-folder-file',
          message: 'Folder-file renamed successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'rename-folder-file',
          message: 'Folder-file rename failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
