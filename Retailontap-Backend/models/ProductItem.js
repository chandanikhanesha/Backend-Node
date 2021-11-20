import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const ProductItem = sequelize.define(
  'ProductItem',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
    },
    colour: {
      type: Sequelize.DataTypes.STRING,
    },
    fabric_material: {
      type: Sequelize.DataTypes.STRING,
    },
    style: {
      type: Sequelize.DataTypes.STRING,
    },
    size: {
      type: Sequelize.DataTypes.STRING,
    },
    product_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    unit_price: {
      type: Sequelize.DataTypes.DECIMAL,
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
    tableName: 'product_items',
  }
);

ProductItem.beforeCreate(async (productItem) => {
  productItem.createdAt = productItem.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

ProductItem.beforeUpdate(async (productItem) => {
  productItem.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default ProductItem;
