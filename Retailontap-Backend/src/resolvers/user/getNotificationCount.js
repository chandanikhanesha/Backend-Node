import { UserNotificationLog } from '../../../models';

export default {
    Query: {
        badge_count: async (parent, args, context) => {
            var badgeCount = 0;

            badgeCount = UserNotificationLog.count(
                {
                    where: {
                        user_id: context.authUser.id,
                        is_sent: true,
                        is_read: false
                    },
                });

            return badgeCount;

        },
    },
};