import { response, getDatabaseInsertableTime } from '../utils/functions';
import { User, UserDevice } from '../../models';

// verifyEmailAuthCode Resolver
export default {
    Mutation: {
        verifyEmailAuthCode: async (parent, { work_email, verification_code, device_type, device_id   }) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {
                       
                        if (user.email_auth_code && user.email_auth_code === verification_code) {                           
                            //Update last_accessed
                             User.update(
                                { last_accessed: getDatabaseInsertableTime(0, 'days'), device_id, device_type },
                                { where: { uuid: user.uuid } }
                            );

                            // check device existance
                            const existDevice = UserDevice.findOne({
                                where: { device_id: device_id },
                            });
                          
                            if (existDevice) {                               
                                // update user_id if already exist
                                UserDevice.update(
                                    { user_id: user.id },
                                    { where: { id: existDevice.id } }
                                );
                            }
                            else {                             
                                // save new device
                                UserDevice.create({
                                    user_id: user.id,
                                    device_id: device_id,
                                    device_type: device_type
                                });
                            }
                          
                            result = response('email-auth-verified', 'SUCCESS', 200);
                        }
                        else {
                            if (isNaN(verification_code))
                                result = response('email-auth-verified', 'Invalid code, please try again', 200);
                            else
                                result = response('email-auth-verified', 'Invalid code, please try again', 200);
                        }
                        resolve(true);

                    });
                } else {
                    error = response('email-auth-verified', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

