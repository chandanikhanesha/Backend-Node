import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Colour = sequelize.define(
  'Colour',
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
    tableName: 'colours',
  }
);

Colour.beforeCreate(async (colour) => {
  colour.createdAt = colour.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Colour.beforeUpdate(async (colour) => {
  colour.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Colour;
