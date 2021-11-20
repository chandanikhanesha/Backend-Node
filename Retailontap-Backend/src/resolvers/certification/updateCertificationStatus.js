import { OrganisationCertification } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
    Mutation: {
        updateCertificationStatus: async (parent, args, context) => {
            let errors = {};
            let isValid = false;

            const validationRule = {
                id: 'required|integer',
                is_active: 'required|boolean'               
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
                    'update-certification-status',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            // check certificate existance
            const certificate = await OrganisationCertification.findOne({
                where: { id: args.id, is_deleted:false },
            });

            if (certificate) {
                 // update certificate status to DB
                const newCertificate = {
                    id: args.id,
                    is_active: args.is_active
                }

                await OrganisationCertification.update(newCertificate, { where: { id: args.id } });

                const status = (args.is_active) ? "enabled" : "disabled";

                return response(
                    'update-certification-status',
                    'Certificate ' + status +' successfully',
                    200
                );
            }
            else {
                return response(
                    'update-certification-status',
                    'Certificate not found!',
                    400
                );
            }
        },
    },
};