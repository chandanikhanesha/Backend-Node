import { response } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';

// userEnableMFA Resolver
export default {
    Mutation: {
        disableMFA: async (parent, { work_email }, context) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });
                
                if (user) {
                    await new Promise((resolve) => {
                        auth.userDisableMFA(user.uuid, (res, err) => {
                            if (err) {
                                error = response('aws-cognito', err.message, 400);
                            } else {
                                user.is_google_auth_enabled = false;
                                //user.is_email_auth_enabled = true;
                                user.default_auth_method = (user.is_email_auth_enabled) ? "Email" : "";
                                user.save();

                                resolve(true);
                                result = response('mfa-disabled', 'success', 200);
                            }
                        });
                    });
                } else {
                    error = response('disable-mfa', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400, 'Something went wrong. Please try again later.');
            }

            if (error !== null) return error;

            return result;
        },
    },
};

