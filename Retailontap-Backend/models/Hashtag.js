import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Hashtag = sequelize.define(
  'Hashtag',
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
    tableName: 'hashtags',
  }
);

Hashtag.beforeCreate(async (hashtag) => {
  hashtag.createdAt = hashtag.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Hashtag.beforeUpdate(async (hashtag) => {
  hashtag.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Hashtag;
