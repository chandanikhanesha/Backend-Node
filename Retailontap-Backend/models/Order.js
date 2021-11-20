import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Project from './Project';

const Order = sequelize.define(
  'Order',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    project_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quotation_item_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_date: {
      type: Sequelize.DataTypes.DATE,
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
    tableName: 'orders',
  }
);

Order.beforeCreate(async (order) => {
  order.createdAt = order.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Order.beforeUpdate(async (order) => {
  order.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Order.hasOne(Project, {
  foreignKey: 'id',
  sourceKey: 'project_id',
  as: 'project',
});

export default Order;
