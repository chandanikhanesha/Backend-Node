import { response } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';
import { getDatabaseInsertableTime } from '../../utils/functions';

// userValidateMFA Resolver
export default {
    Mutation: {
        validateMFA: async (parent, { work_email, confirmation_code }, context) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {

                        auth.userValidateMFA(user.uuid, confirmation_code, context.token, (res, err) => {
                            if (err) {
                                error = response('aws-cognito', err.message, 400);
                            } else {
                                if (res.Status && res.Status === 'SUCCESS') {
                                    result = response('mfa-verified', 'SUCCESS', 200);

                                    user.two_step_verification = getDatabaseInsertableTime(0, 'days');
                                    user.default_auth_method = "Google Authenticator";
                                    user.is_google_auth_enabled = true;
                                    user.save();
                                }
                                else {
                                    console.log("res: " + JSON.stringify(res));
                                    if (res.code === 'EnableSoftwareTokenMFAException')
                                        result = response('mfa-verified', 'Invalid code, please try again', 200);
                                    else if (res.code === 'InvalidParameterException')
                                        result = response('mfa-verified', 'Invalid code, please try again', 200);
                                }
                                resolve(true);
                            }
                        });

                    });
                } else {
                    error = response('validate-mfa', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

