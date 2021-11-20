'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('organisations', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: { type: Sequelize.TEXT, allowNull: false },
      invite_link: { type: Sequelize.TEXT, allowNull: false },
      invite_link_status: { type: Sequelize.BOOLEAN, defaultValue: true },
      name: { type: Sequelize.DataTypes.TEXT },
      organisation_type: { type: Sequelize.DataTypes.TEXT, allowNull: false },
      description: { type: Sequelize.DataTypes.TEXT },
      domains_url: { type: Sequelize.DataTypes.TEXT },
      privacy_url: { type: Sequelize.DataTypes.TEXT },
      delete_reason_text: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      work_phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      license_count: { type: Sequelize.DataTypes.INTEGER },
      license_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      country_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
      time_zone_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'time_zones',
          key: 'id',
        },
      },
      connected_since: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      deleted_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('organisations');
  },
};
