'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('connections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      to: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      model: { type: Sequelize.TEXT, allowNull: false },
      invited_by: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'connection_statuses',
          key: 'id',
        },
      },
      token: { type: Sequelize.TEXT, allowNull: true },
      accepted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('connections');
  },
};
