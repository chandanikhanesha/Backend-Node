'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Hashtagable = sequelize.define(
  'Hashtagable',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    hashtag_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    hashtagable_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    hashtagable_type: {
      type: Sequelize.DataTypes.STRING,
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
    tableName: 'hashtagables',
  }
);

Hashtagable.beforeCreate(async (hashtagable) => {
  hashtagable.createdAt = hashtagable.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Hashtagable.beforeUpdate(async (hashtagable) => {
  hashtagable.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Hashtagable;
