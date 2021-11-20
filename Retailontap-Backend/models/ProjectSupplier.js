import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import User from './User';
import ProjectStatus from './ProjectStatus';

const ProjectSupplier = sequelize.define(
    'project_suppliers',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        project_id: {
            allowNull: false,
            type: Sequelize.DataTypes.INTEGER
        },
        supplier_id: {
            allowNull: false,
            type: Sequelize.DataTypes.INTEGER
        },
        status_id: {
            allowNull: true,
            type: Sequelize.DataTypes.INTEGER
        },
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
        tableName: 'project_suppliers',
    }
);

ProjectSupplier.beforeCreate(async (projectsupplier) => {
    projectsupplier.createdAt = projectsupplier.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ProjectSupplier.beforeUpdate(async (projectsupplier) => {
    projectsupplier.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ProjectSupplier.hasOne(User, {
    foreignKey: 'id',
    sourceKey: 'supplier_id',
    as: 'supplier',
});

ProjectSupplier.hasOne(ProjectStatus, {
    foreignKey: 'id',
    sourceKey: 'status_id',
    as: 'projectstatus',
});


export default ProjectSupplier;
