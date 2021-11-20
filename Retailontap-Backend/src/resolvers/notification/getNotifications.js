import { UserNotificationPreference, Notification } from '../../../models';

export default {
  Query: {
    notifications: async (parent, args, context) => {
      try {
        const notifications = await UserNotificationPreference.findAll({
          where: {
            user_id: context.authUser.id,
          },
          include: [
            {
              model: Notification,
              as: 'notification',
            },
          ],
        });
        return notifications;
      } catch (e) {}
    },
  },
};
