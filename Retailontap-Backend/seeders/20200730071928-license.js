'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('licenses', [
      {
        license_id: 'prod_HhoKLssH77BoBV',
        name: 'Showroom License',
        description: null,
        active: true,
        livemode: false,
      },
      {
        license_id: 'prod_HhoHGx36y1BKW7',
        name: 'Standard License',
        description: null,
        active: true,
        livemode: false,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('licenses', null, {});
  },
};
