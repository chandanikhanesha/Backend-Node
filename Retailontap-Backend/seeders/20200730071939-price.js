'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('prices', [
      //Showroom License
      {
        price_id: 'price_1HCfqGDIm5qz5Bcqw41u4Kxq',
        license_id: 'prod_HhoKLssH77BoBV',
        currency: 'gbp',
        livemode: false,
        active: true,
        billing_scheme: 'tiered',
        tiers_mode: 'volume',
        unit_amount: null,
        unit_amount_decimal: null,
        interval: 'year',
        discount_name: '5%',
        coupon_id: 'lTbLx1A9',
      },
      {
        price_id: 'price_1HCfnlDIm5qz5BcqceyxkYpP',
        license_id: 'prod_HhoKLssH77BoBV',
        currency: 'gbp',
        livemode: false,
        active: true,
        billing_scheme: 'tiered',
        tiers_mode: 'volume',
        unit_amount: null,
        unit_amount_decimal: null,
        interval: 'month',
        discount_name: null,
        coupon_id: null,
      },
      //Standard License
      {
        price_id: 'price_1HD53ZDIm5qz5BcqUD6kEcOJ',
        license_id: 'prod_HhoHGx36y1BKW7',
        currency: 'gbp',
        livemode: false,
        active: true,
        billing_scheme: 'per_unit',
        tiers_mode: null,
        unit_amount: 29988,
        unit_amount_decimal: '29988',
        interval: 'year',
        discount_name: '5%',
        coupon_id: 'lTbLx1A9',
      },
      {
        price_id: 'price_1HD531DIm5qz5BcqmRblgkMO',
        license_id: 'prod_HhoHGx36y1BKW7',
        currency: 'gbp',
        livemode: false,
        active: true,
        billing_scheme: 'per_unit',
        tiers_mode: null,
        unit_amount: 2499,
        unit_amount_decimal: '2499',
        interval: 'month',
        discount_name: null,
        coupon_id: null,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('prices', null, {});
  },
};
