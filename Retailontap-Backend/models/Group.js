import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import User from './User';
import GroupUser from './GroupUser';

const Group = sequelize.define(
  'Group',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    group_type: { type: Sequelize.DataTypes.ENUM('internal', 'external') },
    organisation_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    created_by: {
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
    tableName: 'groups',
  }
);

Group.beforeCreate(async (group) => {
  group.createdAt = group.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Group.beforeUpdate(async (group) => {
  group.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Group.belongsToMany(User, {
  through: GroupUser,
  as: 'users',
});

User.belongsToMany(Group, {
  through: GroupUser,
  as: 'groups',
});

export default Group;
