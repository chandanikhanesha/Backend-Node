'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('report_page_images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      page_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'report_pages',
          key: 'id',
        },
      },
      column_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'report_columns',
          key: 'id',
        },
      },
      report_image_detail_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'report_image_details',
          key: 'id',
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('report_page_images');
  },
};
