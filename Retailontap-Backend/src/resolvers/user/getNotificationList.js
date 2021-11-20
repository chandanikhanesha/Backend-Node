import { UserNotificationLog } from '../../../models';
import { getDatabaseInsertableTime } from '../../utils/functions';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
    Query: {
        notificationlist: async (parent, args, context) => {
            let currentDate = new Date();
            
            const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: false });
            const [{ value: month }, , { value: day }, , { value: year }] = dateTimeFormat.formatToParts(currentDate);
            let sysDate = year + "-" + month + "-" + day;

            let newNotifications = await UserNotificationLog.findAll(
                {                
                    where: {
                        user_id: context.authUser.id, is_sent: true, is_read: false,
                        [Op.and]: [Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), "=", sysDate) ]
                    },
                    order: [['created_at', 'DESC']]
                });

            let todayNotifications = await UserNotificationLog.findAll(
                {
                    where: {
                        user_id: context.authUser.id, is_sent: true, is_read: true,
                        [Op.and]: [Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), "=", sysDate)]
                    },
                    order: [['created_at', 'DESC']]
                });

            let pastNotifications = await UserNotificationLog.findAll(
                {
                    where: {
                        user_id: context.authUser.id, is_sent: true,
                        [Op.and]: [Sequelize.where(Sequelize.fn('date', Sequelize.col('created_at')), "<", sysDate)]
                    },
                    order: [['created_at', 'DESC']]
                });

            return {
                newNotifications,
                todayNotifications,
                pastNotifications                
            }
        },
    },
};