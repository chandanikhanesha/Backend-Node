import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Report from './Report';

const ReportType = sequelize.define(
  'ReportType',
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
    tableName: 'report_types',
  }
);

ReportType.beforeCreate(async (reportType) => {
  reportType.createdAt = reportType.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportType.beforeUpdate(async (reportType) => {
  reportType.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default ReportType;
