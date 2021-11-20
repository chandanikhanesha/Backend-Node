'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {   
    try {
      await queryInterface.addColumn(
        'reports',
        'cover_title',
        Sequelize.TEXT
      );

      await queryInterface.addColumn(
        'reports',
        'file_path',
        Sequelize.TEXT
      );

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async(queryInterface, Sequelize) => {    
    try{
      await queryInterface.removeColumn(
        'reports',
        'cover_title'
      );

      await queryInterface.removeColumn(
        'reports',
        'file_path'
      );

      return Promise.resolve();
    }catch (e) {
      return Promise.reject(e);
    }
  }
};
