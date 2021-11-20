'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('report_types', [
      {
        id: 1,
        name: 'photo',
      },
      {
        id: 2,
        name: 'range',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('report_types', null, {});
  },
};
