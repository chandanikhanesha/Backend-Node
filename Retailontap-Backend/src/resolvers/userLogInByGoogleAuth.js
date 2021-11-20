import {
    errorMessage,
    getDatabaseInsertableTime,
    getUUID,
} from '../utils/functions';
import * as auth from '../utils/service/auth';
import { Organisation, Role, User, UserDevice } from '../../models';

// userLogin Resolver
export default {
    Mutation: {
        userLogInByGoogleAuth: async (parent, { work_email, password, googleCode, device_type, device_id  }) => {
            let error = null;
            // const username = await getUUID(work_email);

            const user = await User.findOne({
                where: { work_email },
                include: [
                    {
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['id', 'name', 'deleted_at'],
                        paranoid: false,
                    },
                ],
            });

            if (!user) {
                return errorMessage('user-login', 'Invalid username or password.');
            }

            await auth.checkOrganisationAvailability(user);

            await auth.checkUserIsActive(user);

            let accessTokens = {};

            await new Promise((resolve) => {
                // create access jwt token via aws cognito
                auth.userLoginByGoogleAuth(user.uuid, password, googleCode, (err, accessToken) => {
                    if (err) {
                        if (err.code === 'CodeMismatchException') {
                            error = {
                                path: 'aws-cognito-error',
                                message: 'Invalid code, please try again.',
                                code: 400,
                                errors: null,
                                token: null,
                            };
                        }
                        else {
                            error = {
                                path: 'aws-cognito-error',
                                message: 'Invalid code, please try again.',
                                code: 400,
                                errors: null,
                                token: null,
                            };
                        }
                    }
                    else accessTokens = accessToken; // jwt token

                    resolve(true);
                });
            });

            if (error !== null) return error;

            //Update last_accessed
            await User.update(
                { last_accessed: getDatabaseInsertableTime(0, 'days'), device_id, device_type },
                { where: { uuid: user.uuid } }
            );

            // check device existance
            const existDevice = await UserDevice.findOne({
                where: { device_id: device_id },
            });

            if (existDevice) {
                // update user_id if already exist
                await UserDevice.update(
                    { user_id: user.id },
                    { where: { id: existDevice.id } }
                );
            }
            else {
                // save new device
                await UserDevice.create({
                    user_id: user.id,
                    device_id: device_id,
                    device_type: device_type
                });
            }

            return {
                path: 'token',
                message: 'token',
                code: 200,
                errors: null,
                token: accessTokens
            };
        },
    },
};
