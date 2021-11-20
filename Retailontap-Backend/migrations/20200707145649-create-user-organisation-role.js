'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_organisation_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      organisation_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'organisations',
          key: 'id',
        },
      },
      role_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_organisation_roles');
  },
};
