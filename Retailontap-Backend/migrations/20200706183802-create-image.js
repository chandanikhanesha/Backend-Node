'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('images', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      imagable_id: { type: Sequelize.DataTypes.INTEGER },
      parent_id: { type: Sequelize.DataTypes.INTEGER },
      imagable_type: { type: Sequelize.DataTypes.TEXT },
      thumbnail: { type: Sequelize.DataTypes.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
      updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('images');
  },
};
