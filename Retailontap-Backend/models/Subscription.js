import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Subscription = sequelize.define(
  'Subscription',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    subscription_id: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    interval: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
    },
    currency: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
    },
    billing_cycle_anchor: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    cancel_at: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    canceled_at: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    created: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    current_period_end: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    current_period_start: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    customer_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    price_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    license_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    item_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    latest_invoice: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    schedule: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    start_date: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    transfer_data: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
    tableName: 'subscriptions',
  }
);

Subscription.beforeCreate(async (subscription) => {
  subscription.createdAt = subscription.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Subscription.beforeUpdate(async (subscription) => {
  subscription.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Subscription;
