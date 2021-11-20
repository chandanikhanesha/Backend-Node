import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Reason from './Reason';
import OrganisationReason from './OrganisationReason';
import Image from './Image';
import Country from './Country';

const Organisation = sequelize.define(
  'Organisation',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: { type: Sequelize.DataTypes.TEXT },
    customer_no: { type: Sequelize.DataTypes.TEXT },
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
    },
    time_zone_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    connected_since: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
    deleted_at: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    underscored: true,
    tableName: 'organisations',
    paranoid: true,
  }
);

Organisation.beforeCreate(async (organisation) => {
  organisation.createdAt = organisation.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Organisation.beforeUpdate(async (organisation) => {
  organisation.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Organisation.beforeDestroy(async (organisation) => {
  organisation.deletedAt = getDatabaseInsertableTime(0, 'days');
});

Reason.belongsToMany(Organisation, {
  through: OrganisationReason,
  as: 'organisation',
});

Organisation.belongsToMany(Reason, {
  through: OrganisationReason,
  as: 'reason',
});

Organisation.hasOne(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'logo',
  scope: {
    imagable_type: 'Organisation',
  },
});
Organisation.hasOne(Country, {
  foreignKey: 'id',
  sourceKey: 'country_id',
  as: 'country',
});

export default Organisation;
