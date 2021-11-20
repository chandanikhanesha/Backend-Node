import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const UserDevice = sequelize.define(
  'UserDevice',
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
    device_id: {
      type: Sequelize.DataTypes.TEXT,
    },
    device_type: {
       type: Sequelize.DataTypes.TEXT,
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
    tableName: 'user_devices',
  }
);

UserDevice.beforeCreate(async (userDevice) => {
  userDevice.createdAt = userDevice.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

UserDevice.beforeUpdate(async (userDevice) => {
  userDevice.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default UserDevice;
