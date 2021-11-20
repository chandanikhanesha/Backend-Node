import { UserNotificationLog } from '../../../models';
import { response } from '../../utils/functions';

export default {
    Mutation: {
        updateNotificationStatus: async (parent, args, context) => {
            const notificationStatus = {
                is_read: args.is_read
            }

            await UserNotificationLog.update(notificationStatus, { where: { user_id: context.authUser.id } });

            return response(
                'update-notification-status',
                'Notification read successfully',
                200
            );
        },
    },
};