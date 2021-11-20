'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('report_columns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      template_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'report_templates',
          key: 'id',
        },
      },
      order_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('report_columns');
  },
};
