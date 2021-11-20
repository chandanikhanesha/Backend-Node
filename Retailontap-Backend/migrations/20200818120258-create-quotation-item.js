'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quotation-items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'product_items',
          key: 'id',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      quotation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quotations',
          key: 'id',
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('quotation-items');
  },
};
