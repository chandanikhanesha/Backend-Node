import { response } from '../../utils/functions';
import { User } from '../../../models';
import { getDatabaseInsertableTime } from '../../utils/functions';

// enableEmailAuth Resolver
export default {
    Mutation: {
        enableEmailAuth: async (parent, { work_email, confirmation_code }, context) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {

                        if (user.email_auth_code && user.email_auth_code === confirmation_code) {
                            result = response('email-auth-enabled', 'SUCCESS', 200);

                            user.two_step_verification = getDatabaseInsertableTime(0, 'days');
                            user.default_auth_method = "Email";
                            user.is_email_auth_enabled = true;
                            user.save();
                        }
                        else {
                            if (isNaN(confirmation_code))
                                result = response('email-auth-enabled', 'Invalid code, please try again', 200);
                            else
                                result = response('email-auth-enabled', 'Invalid code, please try again', 200);
                        }
                        resolve(true);

                    });
                } else {
                    error = response('email-auth-enabled', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

