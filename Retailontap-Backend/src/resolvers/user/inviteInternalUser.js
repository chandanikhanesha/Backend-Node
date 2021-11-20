// inviteInternalUser Resolver

import { response } from '../../utils/functions';
import validator from '../../utils/validator';

import * as UserService from '../../utils/service/UserService';
import { User } from '../../../models';

export default {
    Mutation: {
        inviteInternalUser: async (parent, args, context) => {
            let errors = [];
            let isValid = false;
            let errorMessage = "";

            args.emails = JSON.parse(JSON.stringify(args.emails));

            const validationRule = {
                emails: 'required',
                role_id: 'required|integer|in:[2,3,4]',
            };

            await validator(args, validationRule, {}, (err, status) => {
                if (!status) {
                    isValid = false;
                    errors = err.errors;
                } else {
                    isValid = true;
                }
            });

            if (!isValid) {
                errors = JSON.stringify(errors);
                return response(
                    'invite-internal-user',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            try {
                const errors = [];
                await new Promise((resolve) => {
                    let inviteItem = [];
                    args.emails.map(async (item, index) => {
                        const isExisting = await User.findOne({
                            where: { work_email: item.work_email },
                        });
                        console.log("1");
                        if (isExisting) {
                            console.log("2");
                            inviteItem[index] = errors.push({
                                email: item.work_email,
                                message: 'User with this email already registered',
                            });
                            errorMessage = "User with this email already registered";
                        } else {
                            console.log("3");
                            inviteItem[index] = new Promise((resolve1) => {
                                UserService.inviteInternalUser(args, item, context, resolve1);
                            }).then((res) => {
                                console.log("4: " + JSON.stringify(res));
                                if (res && res.length > 0) {
                                    errors.push(res);
                                    errorMessage = "Failed to sent invitation!";
                                }
                            });
                        }

                        if (inviteItem.length === args.emails.length) {
                            Promise.all([...inviteItem]).then(() => {
                                resolve();
                            });
                        }
                    });
                });

                if (errors.length > 0) {
                    console.log("5: " + JSON.stringify(errors));
                    return response(
                        'invite-internal-user',
                        errorMessage,
                        400,
                        JSON.stringify(errors)
                    );
                } else {
                    return response(
                        'invite-internal-user',
                        'Invitation sent successfully',
                        200,
                        null
                    );
                }
            } catch (e) {
                return response(
                    'invite-internal-user',
                    'Something went wrong.',
                    400,
                    null
                );
            }
        },
    },
};
