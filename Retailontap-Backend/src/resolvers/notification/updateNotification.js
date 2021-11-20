import { UserNotificationPreference } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    updateNotification: async (parent, args, context) => {
      let errors = [];
      const validationRule = {
        notification_id: 'required|integer',
        value: 'required|boolean',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-notification',
          'Validation failed!',
          422,
          errors
        );
      }
      const notification = await UserNotificationPreference.update(
        {
          is_on: args.value,
        },
        {
          where: {
            user_id: context.authUser.id,
            notification_id: args.notification_id,
          },
        }
      );
      if (notification[0] !== 0) {
        return {
          path: 'update-notification',
          message: 'Notification updated successfully!',
          code: 200,
          errors: null,
        };
      } else {
        return {
          path: 'update-notification',
          message: 'Notification update failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
