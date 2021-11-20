import { User } from '../../../models';
import {
    generateRandomString,
    response,
    validateForm,
} from '../../utils/functions';
import * as ConnectionService from '../../utils/service/ConnectionService';
import * as UserService from '../../utils/service/UserService';

export default {
    Mutation: {
        connectExternalUsers: async (parent, args, context) => {
            let errors = [];
            let errorMessage = "";

            args.emails = JSON.parse(JSON.stringify(args.emails));

            const validationRule = {
                emails: 'required',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response('complete-profile', 'Validation failed!', 422, errors);
            }

            try {
                await new Promise((resolve) => {
                    let externalUserItem = [];
                    args.emails.map(async (item, index) => {
                        if (context.authUser.work_email === item.work_email) {
                            errors.push({
                                email: item.work_email,
                                message: 'You can not invite yourself',
                            });

                            errorMessage = "You can not invite yourself";

                            resolve();
                        } else {
                            const useer = await User.findOne({
                                where: { work_email: item.work_email },
                            });

                            if (useer) {
                                let data = {
                                    invited_by: context.authUser.id,
                                    from: context.authUser.id,
                                    to: useer.id,
                                    model: 'User',
                                    status_id: 1, //Pending
                                    token: generateRandomString(32),
                                };

                                externalUserItem[index] = new Promise(async (resolve) => {
                                    const ifConnectionExist = await ConnectionService.checkConnectionExist(
                                        data
                                    );

                                    if (ifConnectionExist) {
                                        errors.push({
                                            email: item.work_email,
                                            message:
                                                'Connection with this external user already exist.',
                                        });

                                        errorMessage = "Connection with this external user already exist.";

                                        resolve();
                                    } else {
                                        await UserService.inviteExternalUser(
                                            data,
                                            context,
                                            item.work_email,
                                            resolve
                                        );
                                    }
                                });
                            } else {
                                externalUserItem[index] = errors.push({
                                    email: item.work_email,
                                    message: 'This user needs to be connected to your organisation to invite them to your network',
                                });

                                errorMessage = "This user needs to be connected to your organisation to invite them to your network";
                            }
                            if (externalUserItem.length === args.emails.length) {
                                Promise.all([...externalUserItem]).then(() => {
                                    resolve();
                                });
                            }
                        }
                    });
                });
                console.log("errors: " + JSON.stringify(errors));
                if (errors.length > 0) {
                    return response(
                        'connect-external-user',
                        errorMessage,
                        400,
                        JSON.stringify(errors)
                    );
                } else {
                    return response(
                        'connect-external-user',
                        'Invitation sent successfully',
                        200,
                        null
                    );
                }
            } catch (e) {
                return response(
                    'connect-external-user',
                    'Something went wrong.',
                    400,
                    null
                );
            }
        },
    },
};
