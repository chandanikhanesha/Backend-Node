'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('report_templates', [
      {
        id: 1,
        name: 'Layout 1',
      },
      {
        id: 2,
        name: 'Layout 2',
      },
      {
        id: 3,
        name: 'Layout 3',
      },
      {
        id: 4,
        name: 'Layout 4',
      },
      {
        id: 5,
        name: 'Layout 5',
      },
      {
        id: 6,
        name: 'Layout 6',
      },
      {
        id: 7,
        name: 'Layout 7',
      },
      {
        id: 8,
        name: 'Layout 8',
      },
      {
        id: 9,
        name: 'Layout 9',
      },
      {
        id: 10,
        name: 'Layout 10',
      },
      {
        id: 11,
        name: 'Layout 11',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('report_templates', null, {});
  },
};
