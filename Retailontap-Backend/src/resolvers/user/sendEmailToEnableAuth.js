import { response, generateActivationCode } from '../../utils/functions';
import { User } from '../../../models';
import * as auth from '../../utils/service/auth';

// sendEmail Resolver
export default {
    Mutation: {
        sendEmailToEnableAuth: async (parent, { work_email }) => {
            let error = null;
            let result = null;

            try {
                const user = await User.findOne({ where: { work_email } });

                if (user) {
                    await new Promise((resolve) => {

                        let code = generateActivationCode();

                        const htmlToSend = "<html>\n" +
                            "        <head>\n" +
                            "        </head>\n" +
                            "        <body>\n" +
                            "        <p>Your verification code to enable email authentication is " + code + "</p>\n" +
                            "        <p>&nbsp;</p>" +
                            "        <p>Many Thanks<br />" +
                            "        RetailonTap Team</p>" +
                            "        </body>\n" +
                            "    </html>";
                        
                        auth.sendEmailToEnableAuth(work_email, htmlToSend, 'Your verification code', 'noreply@retailontap.com', (data, err) => {
                            
                            if (err) {
                                error = response('send-email', err.message, 400);
                            } else {
                                
                                user.email_auth_code = code;
                                user.save();

                                result = response('mail-sent', 'success', 200);
                                resolve(true);
                            }
                           
                        });
                    });
                } else {
                    error = response('send-email', 'Email is not registered.', 400);
                }
            } catch (e) {
                error = response('process-error', JSON.stringify(e), 400);
            }

            if (error !== null) return error;

            return result;
        },
    },
};

