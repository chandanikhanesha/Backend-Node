import { response, validateForm } from '../utils/functions';
import * as EmailService from '../utils/service/EmailService';

export default {
    Mutation: {
        sendEnquiry: async (parent, args, context) => {
            let errors = {};
            let isValid = false;

            const validationRule = {
                name: 'required|string',
                company: 'required|string',
                mobile: 'required|string',
                work_email: 'required|string',               
                company_size: 'required|string',               
                country: 'required|string',               
                message: 'required|string'              
            };

            // validate arguments
            const validation = await validateForm(args, validationRule);

            if (validation.errors) {
                isValid = false;
                errors = validation.errors
            }
            else {
                isValid = true;
            }

            if (!isValid) {
                errors = JSON.stringify(errors);
                return response(
                    'send-enquiry',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            EmailService.sendEnquiryMail(
                args.name,
                args.company,
                args.mobile,
                args.work_email,
                args.phone,
                args.company_size,
                args.country,
                args.message,
                (data, err) => { }
            );

            return response(
                'send-enquiry',
                'Thank you for your enquiry, one of our team will aim to respond you soon.',
                200
            );
        },
    },
}