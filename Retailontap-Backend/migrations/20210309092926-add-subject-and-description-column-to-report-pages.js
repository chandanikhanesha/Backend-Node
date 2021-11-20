'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn(
        'report_pages',
        'subject',
        Sequelize.TEXT
      );

      await queryInterface.addColumn(
        'report_pages',
        'description',
        Sequelize.TEXT
      );

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
      await queryInterface.removeColumn(
        'report_pages',
        'subject'
      );

      await queryInterface.removeColumn(
        'report_pages',
        'description'
      );

      return Promise.resolve();
    }catch (e) {
      return Promise.reject(e);
    }
  }
};
