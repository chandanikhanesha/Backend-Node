'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Notification from './Notification';
const UserNotificationPreference = sequelize.define(
  'UserNotificationPreference',
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
    notification_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    is_on: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: 'user_notification_preferences',
  }
);

UserNotificationPreference.beforeCreate(async (userNotificationPreference) => {
  userNotificationPreference.createdAt = userNotificationPreference.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

UserNotificationPreference.beforeUpdate(async (userNotificationPreference) => {
  userNotificationPreference.updatedAt = getDatabaseInsertableTime(0, 'days');
});

UserNotificationPreference.hasOne(Notification, {
  foreignKey: 'id',
  sourceKey: 'notification_id',
  as: 'notification',
});

export default UserNotificationPreference;
