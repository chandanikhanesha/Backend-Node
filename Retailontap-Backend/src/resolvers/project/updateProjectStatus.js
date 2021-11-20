import { response, validateForm } from '../../utils/functions';
import { Project } from '../../../models';
import * as ProjectService from '../../utils/service/ProjectService';
import * as BaseService from '../../utils/service/BaseService';

export default {
    Mutation: {
        updateProjectStatus: async (parent, args, context) => {
            let errors = null;

            const validationRule = {
                id: 'required|integer',
                status: 'required|string'
            };

            const validation = await validateForm(args, validationRule);

            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('update-project-status', 'Validation failed!', 422, errors);
            }

            await Project.update(args, {
                where: {
                    id: args.id,
                },
                returning: true,
            });

            if (args.status.toLowerCase() === "ended") {
                return response(
                    'update-project-status',
                    'Project ended successfully',
                    200,
                    null
                );
            }
            else {
                return response(
                    'update-project-status',
                    'Project completed successfully',
                    200,
                    null
                );
            }
        },
    },
};
