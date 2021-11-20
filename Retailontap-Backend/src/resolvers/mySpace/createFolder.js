import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';

export default {
    Mutation: {
        createFolder: async (parent, args, context) => {
            let errors = [];
            const validationRule = {
                folderName: 'required|string',
                key: 'string',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response(
                    'my-space-create-folder',
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

                const getAction = await MySpaceService.getAction({
                    folderName: args.folderName,
                    key: args.key || key
                });

                //console.log("*************************getAction: " + getAction);

                if (!getAction) {
                    const folder = await MySpaceService.createFolder({
                        key: args.key || key,
                        folderName: args.folderName,
                    });

                    return {
                        path: 'my-space-create-folder',
                        message: 'My space folder created successfully!',
                        code: 200,
                        errors: null,
                        files: folder,
                    };
                }
                else {
                    return {
                        path: 'my-space-create-folder',
                        message: 'Folder name already exists!',
                        code: 400,
                        errors: null
                    };
                }
            } catch (e) {
                return {
                    path: 'my-space-create-folder',
                    message: 'My space folder creation failed!',
                    code: 400,
                    errors: null,
                };
            }
        },
    },
};
