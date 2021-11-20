'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_notification_logs', {
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
            device_id: { type: Sequelize.TEXT }, 
            message: { type: Sequelize.DataTypes.TEXT },
            response: { type: Sequelize.TEXT },            
            is_sent: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
            is_read: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
            is_deleted: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },            
            created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
            updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
        });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('user_notification_logs');
  }
};
