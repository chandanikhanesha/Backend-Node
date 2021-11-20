import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import User from './User';
import Project from './Project';
import Image from './Image';

const Sample = sequelize.define(
  'Sample',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    retailer_id: { type: Sequelize.DataTypes.INTEGER },
    supplier_id: { type: Sequelize.DataTypes.INTEGER },
    project_id: { type: Sequelize.DataTypes.INTEGER },
    received_date: {
      type: Sequelize.DataTypes.DATE,
    },
    track_number: { type: Sequelize.DataTypes.STRING },
    is_show: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    is_submited: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
    tableName: 'samples',
  }
);

Sample.beforeCreate(async (sample) => {
  sample.createdAt = sample.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Sample.beforeUpdate(async (sample) => {
  sample.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Sample.hasOne(Project, {
  foreignKey: 'id',
  sourceKey: 'project_id',
  as: 'project',
});
Project.hasMany(Sample, {
    as: 'sample',
});
Sample.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'retailer_id',
  as: 'retailer',
});
Sample.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'supplier_id',
  as: 'supplier',
});
Sample.hasOne(Image, {
    foreignKey: 'imagable_id',
    constraints: false,
    as: 'sample_image',
    scope: {
        imagable_type: 'Sample',
    },
});
User.hasMany(Sample, {
  foreignKey: 'supplier_id',
  sourceKey: 'id',
  as: 'supplierSample',
});
User.hasMany(Sample, {
  foreignKey: 'retailer_id',
  sourceKey: 'id',
  as: 'retailerSample',
});
export default Sample;
