import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import ProductItem from './ProductItem';
import Order from './Order';

const QuotationItems = sequelize.define(
  'QuotationItems',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    quotation_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    product_item_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
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
    tableName: 'quotation-items',
  }
);

QuotationItems.beforeCreate(async (quotation) => {
  quotation.createdAt = quotation.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

QuotationItems.beforeUpdate(async (quotation) => {
  quotation.updatedAt = getDatabaseInsertableTime(0, 'days');
});

QuotationItems.hasOne(ProductItem, {
  foreignKey: 'id',
  sourceKey: 'product_item_id',
  as: 'productItem',
});
Order.hasOne(QuotationItems, {
  foreignKey: 'id',
  sourceKey: 'quotation_item_id',
  as: 'item',
});
QuotationItems.hasOne(Order, {
  foreignKey: 'quotation_item_id',
  sourceKey: 'id',
  as: 'order',
});
export default QuotationItems;
