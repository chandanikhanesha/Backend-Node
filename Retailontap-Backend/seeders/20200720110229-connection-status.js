'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('connection_statuses', [
      { name: 'Pending' },
      { name: 'Accepted' },
      { name: 'Canceled' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('connection_statuses', null, {});
  },
};
