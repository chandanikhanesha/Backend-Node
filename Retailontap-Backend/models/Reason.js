import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Reason = sequelize.define(
  'Reason',
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
    tableName: 'reasons',
  }
);

Reason.beforeCreate(async (reason) => {
  reason.createdAt = reason.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Reason.beforeUpdate(async (reason) => {
  reason.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Reason;
