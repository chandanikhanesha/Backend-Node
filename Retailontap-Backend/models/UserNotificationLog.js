import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const UserNotificationLog = sequelize.define(
    'UserNotificationLog',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        invited_by: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        device_id: { type: Sequelize.TEXT },
        message: { type: Sequelize.DataTypes.TEXT },
        response: { type: Sequelize.TEXT },
        is_sent: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
        is_read: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
        is_deleted: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'user_notification_logs',
    }
);

UserNotificationLog.beforeCreate(async (userNotificationLog) => {
    userNotificationLog.created_at = userNotificationLog.updated_at = getDatabaseInsertableTime(
        0,
        'days'
    );
});

UserNotificationLog.beforeUpdate(async (userNotificationLog) => {
    userNotificationLog.updated_at = getDatabaseInsertableTime(0, 'days');
});

export default UserNotificationLog;