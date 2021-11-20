'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'user_devices',
            'device_type',
            Sequelize.TEXT
        );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
          'user_devices',
          'device_type'
      );
  }
};
