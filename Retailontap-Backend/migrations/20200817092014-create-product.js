'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      organisation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'organisations',
          key: 'id',
        },
      },
      views: {
        type: Sequelize.INTEGER,
      },
      requested: {
        type: Sequelize.INTEGER,
      },
      converted: {
        type: Sequelize.INTEGER,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('products');
  },
};
