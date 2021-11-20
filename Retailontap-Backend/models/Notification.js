import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Notification = sequelize.define(
  'Notification',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'notifications',
  }
);

Notification.beforeCreate(async (notification) => {
  notification.createdAt = notification.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Notification.beforeUpdate(async (notification) => {
  notification.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Notification;
