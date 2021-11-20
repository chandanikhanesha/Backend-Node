import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Image from './Image';
import ReportType from './ReportType';
import ReportPage from './ReportPage';

const Report = sequelize.define(
  'Report',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    cover_title: { type: Sequelize.DataTypes.TEXT },
    file_path: { type: Sequelize.DataTypes.TEXT },
    type_id: { type: Sequelize.DataTypes.INTEGER },
    template_id: { type: Sequelize.DataTypes.INTEGER },
    user_id: { type: Sequelize.DataTypes.INTEGER },
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
    tableName: 'reports',
  }
);

Report.beforeCreate(async (report) => {
  report.createdAt = report.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Report.beforeUpdate(async (report) => {
  report.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Report.hasOne(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'coverImage',
  scope: {
    imagable_type: 'Report',
  },
});

Report.hasOne(ReportType, {
  foreignKey: 'id',
  as: 'type',
});

Report.hasMany(ReportPage, {
  foreignKey: 'report_id',
  sourceKey: 'id',
  as: 'reportPages',
});

export default Report;
