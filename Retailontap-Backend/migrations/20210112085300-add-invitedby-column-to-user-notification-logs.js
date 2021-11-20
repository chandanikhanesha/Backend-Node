'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'user_notification_logs',
            'invited_by',
            Sequelize.DataTypes.INTEGER
        );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
          'user_notification_logs',
          'invited_by'
      );
  }
};
