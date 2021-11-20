import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import { Image } from '../models';

const ReportImageDetail = sequelize.define(
  'ReportImageDetail',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_name: { type: Sequelize.DataTypes.TEXT },
    unit: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'report_image_details',
  }
);

ReportImageDetail.beforeCreate(async (reportImageDetail) => {
  reportImageDetail.createdAt = reportImageDetail.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportImageDetail.beforeUpdate(async (reportImageDetail) => {
  reportImageDetail.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ReportImageDetail.hasOne(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'image',
  scope: {
    imagable_type: 'Page',
  },
});

export default ReportImageDetail;
