'use strict';
import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Materialable = sequelize.define(
  'Materialable',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    material_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    materialable_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    materialable_type: {
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
    tableName: 'materialables',
  }
);

Materialable.beforeCreate(async (materialable) => {
  materialable.createdAt = materialable.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Materialable.beforeUpdate(async (materialable) => {
  materialable.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Materialable;
