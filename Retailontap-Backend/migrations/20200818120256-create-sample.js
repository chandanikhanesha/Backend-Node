'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('samples', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      retailer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
      received_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      track_number: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      is_submited: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      is_show: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('samples');
  },
};
