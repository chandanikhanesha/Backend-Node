'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('prices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('prices');
  },
};
