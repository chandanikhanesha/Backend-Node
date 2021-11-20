import { response, validateForm } from '../../utils/functions';
import { Product, Project } from '../../../models';
import * as ProjectService from '../../utils/service/ProjectService';
import * as BaseService from '../../utils/service/BaseService';

export default {
    Mutation: {
        createProject: async (parent, args, context) => {
            let errors = null;

            args.materials = JSON.parse(JSON.stringify(args.materials));
            args.images = JSON.parse(JSON.stringify(args.images));
            args.internalUsers = JSON.parse(JSON.stringify(args.internalUsers));
            args.externalUsers = JSON.parse(JSON.stringify(args.externalUsers));
            args.hashtags = JSON.parse(JSON.stringify(args.hashtags));

            const validationRule = {
                name: 'required|string',
                description: 'required|string',
                //notes: 'required|string',
                //start_date: 'required|string',
                //end_date: 'required|string',
                //unit_cost: 'required|string',
                //markup: 'required|string',
                //retail_price: 'required|string',
                //budget: 'required|string',
                //product_id: 'integer',
                //report_id: 'integer',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('create-project', 'Validation failed!', 422, errors);
            }

            let data = args;
            data.status = (args.status === undefined || args.status === null) ? "Pending" : args.status;
            data.created_by = context.authUser.id;
            data.organisation_id = context.authUser.organisation[0].id;
            const project = await Project.create(data);

            if (project) {
                await BaseService.associateMaterials(
                    project,
                    args.materials,
                    'Project',
                    'create'
                );

                await BaseService.associateProjectFiles(
                    project,
                    args.images,
                    'projects',
                    'Project'
                );

                await ProjectService.associateExternalUsers(
                    context,
                    project,
                    args.externalUsers,
                    args.internalUsers,
                    'create'
                );

                await BaseService.associateHashtags(
                    project,
                    args.hashtags,
                    'Project',
                    'create'
                );
                if (args.product_id) {
                    await Product.increment(
                        { requested: 1, converted: 1 },
                        { where: { id: args.product_id } }
                    );
                }
            }

            return response(
                'create-project',
                'Project created successfully',
                200,
                null
            );
        },
    },
};
