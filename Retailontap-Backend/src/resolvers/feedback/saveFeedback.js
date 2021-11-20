import { UserFeedback, Feedback } from '../../../models';
import { response, validateForm } from '../../utils/functions';
import * as EmailService from '../../utils/service/EmailService';

export default {
  Mutation: {
    saveFeedback: async (parent, args, context) => {
      let errors = {};
      let isValid = false;

      const validationRule = {
        feedback_message: 'required|string',
        type:'required|integer'
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
          'save-feedback',
          'Validation failed!',
          422,
          errors
        );
      }

      let feedback_type = await Feedback.findOne({ where: { id: args.type } });
     
      if (feedback_type !== null) {
        // save feedback to DB
        const feedback = await UserFeedback.create({
          user_id: context.authUser.id,
          feedbacktype_id: args.type,
          feedback_message: args.feedback_message
        });

        if (feedback !== null) {
          EmailService.sendFeedbackMail(
             context.authUser.work_email,
             context.authUser.first_name + " " + context.authUser.last_name,
             feedback_type.name,
             args.feedback_message,            
              (data, err) => { }
          );

          return response(
            'save-feedback',
            'Feedback saved successfully',
            200
          );
        }
        else {
          return response(
            'save-feedback',
            'Something went wrong, please try again later.',
            400
          );
        }
      }
      else {
        return response(
          'save-feedback',
          'Feedback type not found',
          400
        );         
      }
    },
  },
}