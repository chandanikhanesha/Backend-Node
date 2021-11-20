'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('organisation_certifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            organisation_id: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'organisations',
                    key: 'id',
                },
            },
            name: { type: Sequelize.DataTypes.TEXT },
            file_name: { type: Sequelize.DataTypes.TEXT },
            is_active: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
            is_deleted: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
            expiry_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
            created_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
            updated_at: { type: Sequelize.DATE, allowNull: true, defaultValue: null },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('organisation_certifications');
    }
};
