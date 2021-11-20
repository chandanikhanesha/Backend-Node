import { response } from '../../utils/functions';
import { User } from '../../../models';
import { getDatabaseInsertableTime } from '../../utils/functions';

// enableEmailAuth Resolver
export default {
    Mutation: {
        getDefaultAuthMethod: async (parent, { work_email }) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {
                        result = response('default-auth-method', user.default_auth_method, 200);

                        resolve(true);

                    });
                } else {
                    error = response('default-auth-method', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

