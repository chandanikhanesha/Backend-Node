import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import ReportPageImage from './ReportPageImage';
import Report from './Report';

const ReportPage = sequelize.define(
  'ReportPage',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    report_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    subject: { type: Sequelize.DataTypes.TEXT },
    description: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'report_pages',
  }
);

ReportPage.beforeCreate(async (reportPage) => {
  reportPage.createdAt = reportPage.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportPage.beforeUpdate(async (reportPage) => {
  reportPage.updatedAt = getDatabaseInsertableTime(0, 'days');
});

ReportPage.hasMany(ReportPageImage, {
  foreignKey: 'page_id',
  as: 'columns',
});

export default ReportPage;
