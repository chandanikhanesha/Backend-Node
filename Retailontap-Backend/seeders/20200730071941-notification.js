'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notifications', [
      {
        id: 1,
        name: 'Costing sheets',
      },
      {
        id: 2,
        name: 'New connections',
      },
      {
        id: 3,
        name: 'New project',
      },
      {
        id: 4,
        name: 'New conversations',
      },
      {
        id: 5,
        name: 'New Quotation',
      },
      {
        id: 6,
        name: 'Orders',
      },
      {
        id: 7,
        name: 'Samples',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notifications', null, {});
  },
};
