import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    getFolderFileLists: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        key: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-folder-file', 'Validation failed!', 422, errors);
      }
      try {
        let key;
        const userOrganisationType =
          context.authUser.organisation[0].organisation_type;
        if (userOrganisationType === 'retailer') {
          key = `Retailer/User/${context.authUser.id}/`;
        } else {
          key = `Supplier/User/${context.authUser.id}/`;
        }
        const folderFileLists = await MySpaceService.getFolderFileLists({
          key: args.key || key,
        });
        return {
          path: 'get-folder-file',
          message: 'Folder-file retrieved successfully!',
          code: 200,
          errors: null,
          folderFileLists,
        };
      } catch (e) {
        return {
          path: 'get-folder-file',
          message: 'Folder-file get failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
