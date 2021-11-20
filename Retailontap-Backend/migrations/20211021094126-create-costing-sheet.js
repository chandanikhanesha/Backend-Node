"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("costing_sheets", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      style_number: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      supplier_name: {
        type: Sequelize.DataTypes.TEXT,
      },
      packing_cost: {
        type: Sequelize.DataTypes.INTEGER,
      },
      overheads: {
        type: Sequelize.DataTypes.INTEGER,
      },

      fabric_cost: {
        type: Sequelize.DataTypes.JSONB,
      },
      usage: {
        type: Sequelize.DataTypes.JSONB,
      },

      total_fabric: {
        type: Sequelize.DataTypes.JSONB,
      },
      cm_cost: {
        type: Sequelize.DataTypes.JSONB,
      },
      garment_add_ons: {
        type: Sequelize.DataTypes.JSONB,
      },
      product_trim_cost: {
        type: Sequelize.DataTypes.JSONB,
      },
      total_garment: {
        type: Sequelize.DataTypes.INTEGER,
      },
      total_packing_cost: {
        type: Sequelize.DataTypes.INTEGER,
      },
      total_overheads: {
        type: Sequelize.DataTypes.INTEGER,
      },

      total_cost: {
        type: Sequelize.DataTypes.INTEGER,
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
    return queryInterface.dropTable("costing_sheets");
  },
};
