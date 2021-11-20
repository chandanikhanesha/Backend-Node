import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    moveFolderFile: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        newKey: 'required|string',
        oldKey: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('move-folder-file', 'Validation failed!', 422, errors);
      }
      try {
        await MySpaceService.renameAndMoveFolderFile({
          newKey: args.newKey,
          oldKey: args.oldKey,
        });
        return {
          path: 'move-folder-file',
          message: 'Folder-file moved  successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'move-folder-file',
          message: 'Folder-file move failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
