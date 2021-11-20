import { response } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';

// userEnableMFA Resolver
export default {
    Mutation: {
        disableEmailAuth: async (parent, { work_email }) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {

                        user.is_email_auth_enabled = false;
                        user.default_auth_method = (user.is_google_auth_enabled) ? "Google Authenticator" : "";
                        user.save();

                        resolve(true);
                        result = response('email-auth-disabled', 'success', 200);

                    });
                } else {
                    error = response('email-auth-disabled', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400, 'Something went wrong. Please try again later.');
            }

            if (error !== null) return error;

            return result;
        },
    },
};

