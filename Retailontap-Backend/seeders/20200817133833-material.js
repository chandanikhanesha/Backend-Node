'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('materials', [
      { name: 'Cotton' },
      { name: 'Silk' },
      { name: 'Polyester' },
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('materials', null, {});
  },
};
