'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('time_zones', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.DataTypes.TEXT },
      country_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
      utc_offset: { type: Sequelize.DataTypes.INTEGER },
      utc_offset_str: { type: Sequelize.DataTypes.TEXT },
      dst_offset: { type: Sequelize.DataTypes.INTEGER },
      dst_offset_str: { type: Sequelize.DataTypes.STRING },
      alias_of: { type: Sequelize.DataTypes.STRING },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('countries');
  },
};
