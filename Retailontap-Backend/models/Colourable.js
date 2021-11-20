'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Colourable = sequelize.define(
  'Colourable',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    colour_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    colourable_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    colourable_type: {
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
    tableName: 'colourables',
  }
);

Colourable.beforeCreate(async (colourable) => {
  colourable.createdAt = colourable.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Colourable.beforeUpdate(async (colourable) => {
  colourable.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Colourable;
