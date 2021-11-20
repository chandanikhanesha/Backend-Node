'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
      quotation_item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'quotation-items',
          key: 'id',
        },
      },
      delivery_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('orders');
  },
};
