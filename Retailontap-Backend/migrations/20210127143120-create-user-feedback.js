'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      feedbacktype_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      feedback_message: {
        type: Sequelize.TEXT,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user_feedbacks');
  }
};
