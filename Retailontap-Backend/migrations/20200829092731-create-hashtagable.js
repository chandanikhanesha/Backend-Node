'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('hashtagables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hashtag_id: {
        type: Sequelize.INTEGER,
      },
      hashtagable_id: {
        type: Sequelize.INTEGER,
      },
      hashtagable_type: {
        type: Sequelize.STRING,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('hashtagables');
  },
};
