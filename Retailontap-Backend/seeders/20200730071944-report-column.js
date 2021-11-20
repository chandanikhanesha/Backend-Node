'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('report_columns', [
      {
        id: 1,
        template_id: 1,
        order_id: 1,
      },
      {
        id: 2,
        template_id: 1,
        order_id: 2,
      },
      {
        id: 3,
        template_id: 1,
        order_id: 3,
      },

      {
        id: 4,
        template_id: 2,
        order_id: 1,
      },
      {
        id: 5,
        template_id: 2,
        order_id: 2,
      },
      {
        id: 6,
        template_id: 2,
        order_id: 3,
      },
      {
        id: 7,
        template_id: 2,
        order_id: 4,
      },

      {
        id: 8,
        template_id: 3,
        order_id: 1,
      },
      {
        id: 9,
        template_id: 3,
        order_id: 2,
      },
      {
        id: 10,
        template_id: 3,
        order_id: 3,
      },
      {
        id: 11,
        template_id: 3,
        order_id: 4,
      },

      {
        id: 12,
        template_id: 4,
        order_id: 1,
      },
      {
        id: 13,
        template_id: 4,
        order_id: 2,
      },
      {
        id: 14,
        template_id: 4,
        order_id: 3,
      },

      {
        id: 15,
        template_id: 5,
        order_id: 1,
      },
      {
        id: 16,
        template_id: 5,
        order_id: 2,
      },
      {
        id: 17,
        template_id: 5,
        order_id: 3,
      },

      {
        id: 18,
        template_id: 5,
        order_id: 4,
      },
      {
        id: 19,
        template_id: 5,
        order_id: 5,
      },
      {
        id: 20,
        template_id: 5,
        order_id: 6,
      },

      {
        id: 21,
        template_id: 6,
        order_id: 1,
      },
      {
        id: 22,
        template_id: 6,
        order_id: 2,
      },
      {
        id: 23,
        template_id: 6,
        order_id: 3,
      },

      {
        id: 24,
        template_id: 6,
        order_id: 4,
      },
      {
        id: 25,
        template_id: 6,
        order_id: 5,
      },

      {
        id: 26,
        template_id: 7,
        order_id: 1,
      },
      {
        id: 27,
        template_id: 7,
        order_id: 2,
      },
      {
        id: 28,
        template_id: 7,
        order_id: 3,
      },

      {
        id: 29,
        template_id: 7,
        order_id: 4,
      },
      {
        id: 30,
        template_id: 7,
        order_id: 5,
      },
      {
        id: 31,
        template_id: 7,
        order_id: 6,
      },
      {
        id: 32,
        template_id: 7,
        order_id: 7,
      },

      {
        id: 33,
        template_id: 8,
        order_id: 1,
      },
      {
        id: 34,
        template_id: 8,
        order_id: 2,
      },
      {
        id: 35,
        template_id: 8,
        order_id: 3,
      },

      {
        id: 36,
        template_id: 8,
        order_id: 4,
      },
      {
        id: 37,
        template_id: 8,
        order_id: 5,
      },
      {
        id: 38,
        template_id: 8,
        order_id: 6,
      },
      {
        id: 39,
        template_id: 8,
        order_id: 7,
      },
      {
        id: 40,
        template_id: 8,
        order_id: 8,
      },

      {
        id: 41,
        template_id: 9,
        order_id: 1,
      },
      {
        id: 42,
        template_id: 9,
        order_id: 2,
      },
      {
        id: 43,
        template_id: 9,
        order_id: 3,
      },

      {
        id: 44,
        template_id: 9,
        order_id: 4,
      },

      {
        id: 45,
        template_id: 10,
        order_id: 1,
      },
      {
        id: 46,
        template_id: 10,
        order_id: 2,
      },
      {
        id: 47,
        template_id: 10,
        order_id: 3,
      },

      {
        id: 48,
        template_id: 11,
        order_id: 1,
      },
      {
        id: 49,
        template_id: 11,
        order_id: 2,
      },
      {
        id: 50,
        template_id: 11,
        order_id: 3,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('report_columns', null, {});
  },
};
