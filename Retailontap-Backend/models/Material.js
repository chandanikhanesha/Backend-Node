import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Material = sequelize.define(
  'Material',
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
    tableName: 'materials',
  }
);

Material.beforeCreate(async (material) => {
  material.createdAt = material.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Material.beforeUpdate(async (material) => {
  material.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Material;
