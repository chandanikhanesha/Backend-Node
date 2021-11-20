import { Image } from '../../../models';
const { Op } = require('sequelize');
import { response, validateForm } from '../../utils/functions';

export default {
    Query: {
        projectFiles: async (parent, args, context) => {
            let errors = null;

            const validationRule = {
                id: 'required|integer',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('get-project-files', 'Validation failed!', 422, errors);
            }
            const listFiles = await Image.findAll({
                where: {
                    imagable_id: args.id,
                    imagable_type: {
                        [Op.in]: ['Project', 'ProjectFile'],
                    }
                },
                attributes: ['id', 'thumbnail']
            });
           
            return {
                files: listFiles
            }
        },
    },
};