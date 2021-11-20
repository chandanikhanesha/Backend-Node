import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const ReportColumn = sequelize.define(
  'ReportColumn',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    template_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    order_id: {
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
    tableName: 'report_columns',
  }
);

ReportColumn.beforeCreate(async (reportColumn) => {
  reportColumn.createdAt = reportColumn.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ReportColumn.beforeUpdate(async (reportColumn) => {
  reportColumn.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default ReportColumn;
