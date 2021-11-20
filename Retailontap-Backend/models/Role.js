import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Role = sequelize.define(
  'Role',
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
    tableName: 'roles',
  }
);

Role.beforeCreate(async (role) => {
  role.createdAt = role.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Role.beforeUpdate(async (role) => {
  role.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Role;
