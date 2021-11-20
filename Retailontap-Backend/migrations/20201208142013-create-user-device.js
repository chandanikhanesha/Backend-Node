'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_devices', {
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
      device_id: {
        type: Sequelize.TEXT,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_devices');
  },
};
