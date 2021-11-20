'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('subscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      subscription_id: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
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
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('subscriptions');
  },
};
