import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Tier from './Tier';

const Price = sequelize.define(
  'Price',
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
    license_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    livemode: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    billing_scheme: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    tiers_mode: {
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
    interval: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    discount_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    coupon_id: {
      type: Sequelize.DataTypes.STRING,
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
    tableName: 'prices',
  }
);

Price.beforeCreate(async (price) => {
  price.createdAt = price.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Price.beforeUpdate(async (price) => {
  price.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Price.hasMany(Tier, {
  foreignKey: 'price_id',
  sourceKey: 'price_id',
  as: 'tiers',
});

export default Price;
