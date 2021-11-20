'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('feedback_types', [
      {       
        name: "Something isn't working",
      },
      {       
        name: "General Feedback",
      },
      {       
        name: "Span or Abuse",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('feedback_types', null, {});
  }
};
