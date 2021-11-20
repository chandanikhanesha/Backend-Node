import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const TimeZone = sequelize.define(
  'TimeZone',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    country_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    utc_offset: { type: Sequelize.DataTypes.NUMBER },
    utc_offset_str: { type: Sequelize.DataTypes.TEXT },
    dst_offset: { type: Sequelize.DataTypes.NUMBER },
    dst_offset_str: { type: Sequelize.DataTypes.STRING },
    alias_of: { type: Sequelize.DataTypes.STRING },
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
    underscored: true,
    tableName: 'time_zones',
  }
);

TimeZone.beforeCreate(async (timeZone) => {
  timeZone.createdAt = timeZone.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

TimeZone.beforeUpdate(async (timeZone) => {
  timeZone.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default TimeZone;
