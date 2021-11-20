'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reasons', [
      { name: 'Dissatisfied with customer support' },
      { name: 'Difficult to setup and manage' },
      { name: 'Product does not meet our needs' },
      { name: 'Business needs have changed' },
      { name: 'Moving to another service provider' },
      { name: 'System is not reliable' },
      { name: 'Dissatisfied with price' },
      { name: 'Other' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reasons', null, {});
  },
};
