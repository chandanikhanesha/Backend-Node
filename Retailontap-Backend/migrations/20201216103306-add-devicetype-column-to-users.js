'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'users',
            'device_type',
            Sequelize.TEXT
        );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
          'users',
          'device_type'
      );
  }
};
