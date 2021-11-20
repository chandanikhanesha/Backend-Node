"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn(
        "quotations",
        "product_style",
        Sequelize.TEXT
      );
      await queryInterface.addColumn(
        "quotations",
        "quotation_type",
        Sequelize.TEXT
      );
      await queryInterface.addColumn("quotations", "colour", Sequelize.TEXT);
      await queryInterface.addColumn("quotations", "price", Sequelize.INTEGER);

      await queryInterface.addColumn("quotations", "size", Sequelize.TEXT);
      await queryInterface.addColumn(
        "quotations",
        "total_units",
        Sequelize.TEXT
      );
      await queryInterface.addColumn(
        "quotations",
        "description",
        Sequelize.TEXT
      );

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn("quotations", "product_style");
      await queryInterface.removeColumn("quotations", "quotation_type");
      await queryInterface.removeColumn("quotations", "colour");
      await queryInterface.removeColumn("quotations", "price");
      await queryInterface.removeColumn("quotations", "size");
      await queryInterface.removeColumn("quotations", "total_units");
      await queryInterface.removeColumn("quotations", "description");

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
