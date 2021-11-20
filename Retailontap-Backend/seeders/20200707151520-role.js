'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      { name: 'Owner' },
      { name: 'Administrator' },
      { name: 'Standard' },
      { name: 'Stakeholder' },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
