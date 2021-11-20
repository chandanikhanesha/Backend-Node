import { response, validateForm } from '../../utils/functions';
import { Project, Image } from '../../../models';
const { Op } = require('sequelize');
import { deleteAssociations } from '../../utils/service/BaseService';

export default {
    Mutation: {
        addFilesToProject: async (parent, args, context) => {
            let errors = null;
            
            args.files = JSON.parse(JSON.stringify(args.files));
            
            const validationRule = {                
                action: 'required|string',
                id: 'required|integer',                
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('add-files-to-project', 'Validation failed!', 422, errors);
            }

            const project = await Project.findOne({
                where: {
                    id: args.id,
                    organisation_id: context.authUser.organisation[0].id,
                    created_by: context.authUser.id,
                }
            });

            if (project) {
                if (args.action === "delete") {
                    const condition = {
                        where: {
                            imagable_id: project.id,
                            imagable_type: 'ProjectFile'                           
                        },
                    };

                    await deleteAssociations(Image, condition);
                } else {
                    if (args.files && args.files.length > 0) {
                        let processedfiles = [];

                        await args.files.map(async (item, index) => {
                            processedfiles.push(item.file_name);

                            const isExisting = await Image.findOne({
                                where: { imagable_id: project.id, imagable_type: 'ProjectFile', thumbnail: item.file_name },
                            });
                            if (!isExisting) {
                                await Image.create({
                                    imagable_type: 'ProjectFile',
                                    imagable_id: project.id,
                                    thumbnail: item.file_name,
                                    parent_id: null,
                                });
                            }
                        });

                        if (args.action === "update") {
                            const tumbnails = {};
                            if (processedfiles.length) {
                                tumbnails[Op.notIn] = processedfiles;

                                const condition = {
                                    where: {
                                        imagable_id: project.id,
                                        imagable_type: 'ProjectFile',
                                        thumbnail: tumbnails,
                                    },
                                };

                                await deleteAssociations(Image, condition);
                            }
                        }
                    } else {
                        return response(
                            'add-files-to-project',
                            'No files found',
                            200,
                            null
                        );
                    }
                }
            } else {
                return response(
                    'add-files-to-project',
                    'No project found',
                    200,
                    null
                );
            }

            return response(
                'add-files-to-project',
                'Files uploaded successfully',
                200,
                null
            );
        },
    },
};