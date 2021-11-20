import { response } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';

// userEnableMFA Resolver
export default {
    Mutation: {
        enableMFA: async (parent, { work_email }, context) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });
                console.log("context.token: " + context.token);
                if (user) {
                    await new Promise((resolve) => {
                        auth.userEnableMFA(user.uuid, context.token, (res, err) => {
                            if (err) {
                                error = response('aws-cognito', err.message, 400);
                            } else {
                                result = response('mfa-enabled', res, 200);

                                resolve(true);
                            }
                        });
                    });
                } else {
                    error = response('enable-mfa', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400, 'Something went wrong. Please try again later.');
            }

            if (error !== null) return error;

            return result;
        },
    },
};

