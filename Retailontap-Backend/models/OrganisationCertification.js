import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const OrganisationCertification = sequelize.define(
    'OrganisationCertification',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },      
        organisation_id: {
            type: Sequelize.DataTypes.INTEGER,
        },
        name: { type: Sequelize.DataTypes.TEXT },
        file_name: { type: Sequelize.DataTypes.TEXT },
        is_active: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
        is_deleted: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
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
        expiry_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        }
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'organisation_certifications',
    }
);

OrganisationCertification.beforeCreate(async (organisationCertification) => {
    organisationCertification.created_at = organisationCertification.updated_at =  getDatabaseInsertableTime(
        0,
        'days'
    );  
});

OrganisationCertification.beforeUpdate(async (organisationCertification) => {
    organisationCertification.updated_at = getDatabaseInsertableTime(0, 'days');   
});


export default OrganisationCertification;