import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const OrganisationReason = sequelize.define(
  'OrganisationReason',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    reason_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    organisation_id: {
      type: Sequelize.DataTypes.INTEGER,
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
    tableName: 'organisation_reasons',
  }
);

OrganisationReason.beforeCreate(async (organisationReason) => {
  organisationReason.createdAt = organisationReason.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

OrganisationReason.beforeUpdate(async (organisationReason) => {
  organisationReason.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default OrganisationReason;
