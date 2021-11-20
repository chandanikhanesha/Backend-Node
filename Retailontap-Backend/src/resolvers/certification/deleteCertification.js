import { OrganisationCertification } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
    Mutation: {
        deleteCertification: async (parent, args, context) => {
            let errors = {};
            let isValid = false;

            const validationRule = {
                id: 'required|integer'
            };

            // validate arguments
            const validation = await validateForm(args, validationRule);

            if (validation.errors) {
                isValid = false;
                errors = validation.errors
            }
            else {
                isValid = true;
            }

            if (!isValid) {
                errors = JSON.stringify(errors);
                return response(
                    'delete-certification',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            // check certificate existance
            const certificate = await OrganisationCertification.findOne({
                where: { id: args.id, is_deleted: false },
            });

            if (certificate) {
                // update certificate delete status to DB
                const newCertificate = {
                    id: args.id,
                    is_deleted: true
                }

                await OrganisationCertification.update(newCertificate, { where: { id: args.id } });

                return response(
                    'delete-certification',
                    'Certificate deleted successfully',
                    200
                );
            }
            else {
                return response(
                    'delete-certification',
                    'Certificate not found!',
                    400
                );
            }
        },
    },
};