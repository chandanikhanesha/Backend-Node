import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import ReportColumn from './ReportColumn';

const ReportTemplate = sequelize.define(
  'ReportTemplate',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    svg: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'report_templates',
  }
);

ReportTemplate.beforeCreate(async (reportTemplate) => {
  reportTemplate.createdAt = reportTemplate.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportTemplate.beforeUpdate(async (reportTemplate) => {
  reportTemplate.updatedAt = getDatabaseInsertableTime(0, 'days');
});
ReportTemplate.hasMany(ReportColumn, {
  foreignKey: 'template_id',
  sourceKey: 'id',
  as: 'columns',
});
export default ReportTemplate;
