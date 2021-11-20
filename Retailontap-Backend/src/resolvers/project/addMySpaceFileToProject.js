import { response, validateForm } from '../../utils/functions';
import * as MySpaceService from '../../utils/service/MySpaceService';
import { Project, Image } from '../../../models';

export default {
    Mutation: {
        addMySpaceFileToProject: async (parent, args, context) => {
            let errors = [];
            const validationRule = {
                project_id: 'required|integer',
                newKey: 'required|string',
                oldKey: 'required|string',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response(
                    'add-my-space-file-to-project',
                    'Validation failed!',
                    422,
                    errors
                );
            }
            try {
                const project = await Project.findOne({
                    where: {
                        id: args.project_id,
                        organisation_id: context.authUser.organisation[0].id,
                        created_by: context.authUser.id,
                    }
                });

                if (project) {
                    await MySpaceService.copyFolderFile({
                        newKey: args.newKey,
                        oldKey: args.oldKey,
                    });

                    await Image.create({
                        imagable_type: 'ProjectFile',
                        imagable_id: args.project_id,
                        thumbnail: args.newKey,
                        parent_id: null,
                    });

                    return {
                        path: 'add-my-space-file-to-project',
                        message: 'file uploaded sucessfully!',
                        code: 200,
                        errors: null,
                    };
                } else {
                    return response(
                        'add-my-space-file-to-project',
                        'No project found',
                        200,
                        null
                    );
                }
            } catch (e) {
                return {
                    path: 'add-my-space-file-to-project',
                    message: 'file upload failed!',
                    code: 400,
                    errors: null,
                };
            }
        },
    },
};