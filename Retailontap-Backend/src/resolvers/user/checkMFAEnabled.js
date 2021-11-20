import { response } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';

// userCheckMFAEnabled Resolver
export default {
    Mutation: {
        checkMFAEnabled: async (parent, { work_email }, context) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });
                
                if (user) {
                    await new Promise((resolve) => {
                        auth.userCheckMFAEnabled(context.token, (res, err) => {
                            if (err) {
                                error = response('aws-cognito', err.message, 400);
                            } else {
                                console.log("res.UserMFASettingList: " + JSON.stringify(res));
                                if (res.UserMFASettingList && res.UserMFASettingList.includes('SOFTWARE_TOKEN_MFA')) {
                                    result = response('user-mfa-enabled', 'SUCCESS', 200);
                                }
                                else
                                    result = response('user-mfa-enabled', 'false', 200);
                                resolve(true);
                            }
                        });
                    });
                } else {
                    error = response('check-mfa-enabled', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400, 'Something went wrong. Please try again later.');
            }

            if (error !== null) return error;

            return result;
        },
    },
};

