import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Tier = sequelize.define(
  'Tier',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    price_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    flat_amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    flat_amount_decimal: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    unit_amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    unit_amount_decimal: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    up_to: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'tiers',
  }
);

Tier.beforeCreate(async (tier) => {
  tier.createdAt = tier.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Tier.beforeUpdate(async (tier) => {
  tier.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Tier;
