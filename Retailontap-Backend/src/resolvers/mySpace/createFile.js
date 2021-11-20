import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
  Mutation: {
    createFile: async (parent, args, context) => {
      let errors = [];
      args.files = JSON.parse(JSON.stringify(args.files));
      const validationRule = {
        key: 'string',
      };
      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'my-space-create-file',
          'Validation failed!',
          422,
          errors
        );
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
        const file = await MySpaceService.createFile({
          key: args.key || key,
          files: args.files,
        });
        return {
          path: 'my-space-create-file',
          message: 'My space folder created successfully!',
          code: 200,
          errors: null,
          files: file,
        };
      } catch (e) {
        return {
          path: 'my-space-create-file',
          message: 'My space create folder failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
