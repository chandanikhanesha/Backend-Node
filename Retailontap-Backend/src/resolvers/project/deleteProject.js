import { response, validateForm } from '../../utils/functions';
import { Project, ProjectSupplier, Sample } from '../../../models';

export default {
    Mutation: {
        deleteProject: async (parent, args, context) => {
            let errors = null;
            
            const validationRule = {
                id: 'required|integer'
            };

            const validation = await validateForm(args, validationRule);

            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('delete-project', 'Validation failed!', 422, errors);
            }

            const projSuppliers = await ProjectSupplier.findAll({
                where: {
                    project_id: args.id
                },
            });

            //console.log("**************");
            //console.log("projSuppliers.length: " + projSuppliers.length);
            //console.log("**************");

            if (projSuppliers.length > 0) {
                projSuppliers.forEach(async (projSupplier) => {
                    await projSupplier.destroy();
                });
            }

            const samples = await Sample.findAll({
                where: {
                    project_id: args.id
                },
            });

            //console.log("**************");
            //console.log("samples.length: " + samples.length);
            //console.log("**************");

            if (samples.length > 0) {
                samples.forEach(async (sample) => {
                    await sample.destroy();
                });
            }

            const project = await Project.findByPk(args.id);

            if (project) {
                const destroy = await project.destroy();
                
                if (destroy) {
                    return {
                        path: 'delete-project',
                        message: 'Project deleted successfully',
                        code: 200,
                    };
                } else {
                    return {
                        path: 'delete-project',
                        message: 'Error while deleting Project',
                        code: 400,
                    };
                }
            }
            else
                return {
                    path: 'delete-project',
                    message: 'Something went wrong.',
                    code: 400,
                }
        },
    },
};
