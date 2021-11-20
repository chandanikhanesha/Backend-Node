'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const GroupUser = sequelize.define(
  'GroupUser',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    group_id: {
      type: Sequelize.DataTypes.INTEGER,
      // allowNull: false,
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
      // allowNull: false,
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
    tableName: 'group_users',
  }
);

GroupUser.beforeCreate(async (groupUser) => {
  groupUser.createdAt = groupUser.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

GroupUser.beforeUpdate(async (groupUser) => {
  groupUser.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default GroupUser;
