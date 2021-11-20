import { response } from '../../utils/functions';
import { User } from '../../../models';
import { getDatabaseInsertableTime } from '../../utils/functions';

// enableEmailAuth Resolver
export default {
    Mutation: {
        checkAuthEnabled: async (parent, { work_email }) => {
            let error = null;
            let result = null;
            let authMethods = [];

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {

                        if (user.is_email_auth_enabled) {
                            authMethods.push({
                                method: 'Email',
                                isDefault: (user.default_auth_method === 'Email') ? 'true' : 'false'
                            });
                        }

                        if (user.is_google_auth_enabled) {
                            authMethods.push({
                                method: 'Google Authenticator',
                                isDefault: (user.default_auth_method === 'Google Authenticator') ? 'true' : 'false'
                            });
                        }

                        if (user.is_email_auth_enabled || user.is_google_auth_enabled) {
                            result = response('auth-enabled', true, 200, JSON.stringify(authMethods));
                        }
                        else {
                            result = response('auth-enabled', false, 200, JSON.stringify(authMethods));
                        }
                        resolve(true);

                    });
                } else {
                    error = response('auth-enabled', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

