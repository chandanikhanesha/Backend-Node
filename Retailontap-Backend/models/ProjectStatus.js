import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const ProjectStatus = sequelize.define(
    'project_status',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: Sequelize.DataTypes.TEXT },
        created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'project_status',
    }
); 

ProjectStatus.beforeCreate(async (projectstatus) => {
    projectstatus.createdAt = projectstatus.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ProjectStatus.beforeUpdate(async (projectstatus) => {
    projectstatus.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default ProjectStatus;