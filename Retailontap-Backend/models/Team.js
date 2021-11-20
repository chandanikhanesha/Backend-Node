import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import User from './User';
import UserTeamRole from './UserTeamRole';

const Team = sequelize.define(
  'Team',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    description: { type: Sequelize.DataTypes.TEXT },
    organisation_id: {
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
    tableName: 'teams',
  }
);

Team.beforeCreate(async (team) => {
  team.createdAt = team.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Team.beforeUpdate(async (team) => {
  team.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Team.belongsToMany(User, {
  through: UserTeamRole,
  as: 'members',
});

export default Team;
