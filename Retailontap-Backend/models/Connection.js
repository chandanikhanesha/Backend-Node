import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Connection = sequelize.define(
  'Connection',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    from: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    to: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    model: { type: Sequelize.TEXT, allowNull: false },
    invited_by: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    status_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    token: { type: Sequelize.TEXT, allowNull: true },
    accepted_at: {
      allowNull: true,
      type: Sequelize.DATE,
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
    tableName: 'connections',
  }
);

Connection.beforeCreate(async (connection) => {
  connection.createdAt = connection.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Connection.beforeUpdate(async (connection) => {
  connection.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Connection;
