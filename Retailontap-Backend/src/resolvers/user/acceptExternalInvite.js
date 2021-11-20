import {
    getDatabaseInsertableTime,
    response,
    validateForm,
} from '../../utils/functions';
import { Connection, UserOrganisationRole } from '../../../models';

export default {
    Mutation: {
        acceptExternalInvite: async (parent, args) => {
            let errors = [];
            let connection = null;

            if (args.token !== null) {
                connection = await Connection.findAll({
                    where: { token: args.token },
                });

                if (connection) {
                    const accept = await connection[0].update({
                        token: args.is_accepted ? null : args.token,
                        status_id: args.is_accepted === true ? 2 : 3, //accepted
                        accepted_at: args.is_accepted ? getDatabaseInsertableTime(0, 'days') : null,
                    });

                    await connection[1].update({
                        token: args.is_accepted ? null : args.token,
                        status_id: args.is_accepted === true ? 2 : 3, //accepted
                        accepted_at: args.is_accepted ? getDatabaseInsertableTime(0, 'days') : null,
                    });

                    if (accept) {
                        return response(
                            'accept-external-invite',
                            'Invitation accepted successfully',
                            200,
                            null
                        );
                    } else {
                        return response(
                            'accept-external-invite',
                            'Accept invitation failed',
                            400,
                            null
                        );
                    }
                }
                else {
                    return response(
                        'accept-external-invite',
                        'Your accept invitation link is not valid.',
                        400,
                        null
                    );
                }
            }
            else {
                let invitedByUser = await UserOrganisationRole.findOne({ where: { user_id: args.invited_by, role_id: 1 } });
                let user = await UserOrganisationRole.findOne({ where: { user_id: args.user_id, role_id: 1 } });

                const invitedByConnection = await Connection.findAll({
                    where: { from: invitedByUser.organisation_id, to: user.organisation_id },
                });

                const userConnection = await Connection.findAll({
                    where: { from: user.organisation_id, to: invitedByUser.organisation_id },
                });

                if (invitedByConnection) {
                    const accept = await invitedByConnection[0].update({
                        token: null,
                        status_id: args.is_accepted === true ? 2 : 3,
                        accepted_at: getDatabaseInsertableTime(0, 'days'),
                    });

                    await userConnection[0].update({
                        token: null,
                        status_id: args.is_accepted === true ? 2 : 3,
                        accepted_at: getDatabaseInsertableTime(0, 'days'),
                    });

                    if (accept) {
                        if (args.is_accepted) {
                            return response(
                                'accept-external-invite',
                                'Invitation accepted successfully',
                                200,
                                null
                            );
                        }
                        else {
                            return response(
                                'accept-external-invite',
                                'Invitation rejected successfully',
                                200,
                                null
                            );
                        }
                    } else {
                        return response(
                            'accept-external-invite',
                            'Accept invitation failed',
                            400,
                            null
                        );
                    }
                }
                else {
                    return response(
                        'accept-external-invite',
                        'Your accept invitation link is not valid.',
                        400,
                        null
                    );
                }
            }
        },
    },
};
