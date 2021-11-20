import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import ReportColumn from './ReportColumn';
import ReportImageDetail from './ReportImageDetail';

const ReportPageImage = sequelize.define(
  'ReportPageImage',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    page_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    column_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
    report_image_detail_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'report_page_images',
  }
);

ReportPageImage.beforeCreate(async (reportPageImage) => {
  reportPageImage.createdAt = reportPageImage.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportPageImage.beforeUpdate(async (reportPageImage) => {
  reportPageImage.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ReportPageImage.hasOne(ReportColumn, {
  foreignKey: 'id',
  sourceKey: 'column_id',
  as: 'column',
});
ReportPageImage.hasOne(ReportImageDetail, {
  foreignKey: 'id',
  sourceKey: 'report_image_detail_id',
  as: 'imageDetail',
});

export default ReportPageImage;
