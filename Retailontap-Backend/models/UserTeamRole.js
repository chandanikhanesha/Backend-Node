'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const UserTeamRole = sequelize.define(
  'UserTeamRole',
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
    team_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.DataTypes.INTEGER,
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
    tableName: 'user_team_roles',
  }
);

UserTeamRole.beforeCreate(async (userTeamRole) => {
  userTeamRole.createdAt = userTeamRole.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

UserTeamRole.beforeUpdate(async (userTeamRole) => {
  userTeamRole.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default UserTeamRole;
