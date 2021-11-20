import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const ConnectionStatus = sequelize.define(
  'ConnectionStatus',
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
    tableName: 'connection_statuses',
  }
);

ConnectionStatus.beforeCreate(async (connectionStatus) => {
  connectionStatus.createdAt = connectionStatus.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ConnectionStatus.beforeUpdate(async (connectionStatus) => {
  connectionStatus.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default ConnectionStatus;
