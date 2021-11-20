'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tiers', {
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
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tiers');
  },
};
