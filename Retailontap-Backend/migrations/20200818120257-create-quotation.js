"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("quotations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      retailer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      transportation_type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      total: {
        type: Sequelize.DECIMAL,
      },

      is_submited: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("quotations");
  },
};
