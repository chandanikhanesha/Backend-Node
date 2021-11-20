import { response, validateForm } from '../../utils/functions';
import { OrganisationCertification } from '../../../models';

export default {
    Mutation: {
        getCertification: async (parent, args, context) => {
            let errors = null;

            const validationRule = {
                id: 'required|integer',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('get-certification', 'Validation failed!', 422, errors);
            }

            const certificate = await OrganisationCertification.findOne({
                where: { id: args.id, is_deleted: false },
                attributes: ['id', 'name', 'file_name', 'is_active','expiry_at']
            });
           
            return {
                path: 'get-certification',
                message: 'Get certification',
                code: 200,
                errors: null,
                certificate: certificate,
            };
        },
    },
};