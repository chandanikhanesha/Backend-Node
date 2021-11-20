'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const UserOrganisationRole = sequelize.define(
  'UserOrganisationRole',
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
    organisation_id: {
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
    tableName: 'user_organisation_roles',
  }
);

UserOrganisationRole.beforeCreate(async (userOrganisationRole) => {
  userOrganisationRole.createdAt = userOrganisationRole.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

UserOrganisationRole.beforeUpdate(async (userOrganisationRole) => {
  userOrganisationRole.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default UserOrganisationRole;
