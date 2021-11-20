'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tiers', [
      //Shoow Room License tires
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        flat_amount: 5988,
        flat_amount_decimal: '5988',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 10,
      },
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        flat_amount: 11988,
        flat_amount_decimal: '11988',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 50,
      },
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        flat_amount: 19188,
        flat_amount_decimal: '19188',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 75,
      },
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        flat_amount: 25188,
        flat_amount_decimal: '25188',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 100,
      },
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        flat_amount: 60000,
        flat_amount_decimal: '60000',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: null,
      },

      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        flat_amount: 499,
        flat_amount_decimal: '499',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 10,
      },
      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        flat_amount: 999,
        flat_amount_decimal: '999',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: 50,
      },
      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        flat_amount: 1599,
        flat_amount_decimal: '1599',
        unit_amount: null,
        unit_amount_decimal: null,
        up_to: 75,
      },
      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        flat_amount: 2099,
        flat_amount_decimal: '2099',
        unit_amount: null,
        unit_amount_decimal: null,
        up_to: 100,
      },
      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        flat_amount: 5000,
        flat_amount_decimal: '5000',
        unit_amount: 0,
        unit_amount_decimal: '0',
        up_to: null,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tiers', null, {});
  },
};
