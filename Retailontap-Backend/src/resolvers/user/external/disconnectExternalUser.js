import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';
import { Connection } from '../../../../models';

export default {
    Mutation: {
        disconnectExternalUser: async (parent, args, context) => {
            let errors = [];

            const validationRule = {
                id: 'required|integer',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response(
                    'disconnect-external-user',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            const ifConnectionFromExist = await Connection.findOne({
                where: {
                    from: context.authUser.id,
                    to: args.id,
                    status_id: 1,
                    model: 'User',
                },
            });

            const ifConnectionToExist = await Connection.findOne({
                where: {
                    from: args.id,
                    to: context.authUser.id,
                    status_id: 1,
                    model: 'User',
                },
            });

            if (ifConnectionFromExist && ifConnectionToExist) {
                const disconnectFrom = ifConnectionFromExist.destroy();
                const disconnectTo = ifConnectionToExist.destroy();
                if (disconnectFrom && disconnectTo) {
                    return response(
                        'disconnect-external-user',
                        'External user disconnected successfully',
                        200,
                        null
                    );
                } else {
                    return response(
                        'disconnect-external-user',
                        'Disconnect external user failed',
                        200,
                        null
                    );
                }
            } else {
                return response(
                    'disconnect-external-user',
                    'Connection not found',
                    400,
                    null
                );
            }
        },
    },
};
