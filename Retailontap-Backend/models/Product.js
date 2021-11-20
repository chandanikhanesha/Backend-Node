import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Hashtag from './Hashtag';
import Colour from './Colour';
import Material from './Material';
import Colourable from './Colourable';
import Materialable from './Materialable';
import Hashtagable from './Hashtagable';
import Image from './Image';
import ProductItem from './ProductItem';
import Organisation from './Organisation';

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    description: { type: Sequelize.DataTypes.TEXT },
    user_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    organisation_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    views: {
      type: Sequelize.DataTypes.INTEGER,
    },
    requested: {
      type: Sequelize.DataTypes.INTEGER,
    },
    converted: {
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
    tableName: 'products',
  }
);

Product.beforeCreate(async (product) => {
  product.createdAt = product.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Product.beforeUpdate(async (product) => {
  product.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Product.belongsToMany(Colour, {
  through: {
    model: Colourable,
    unique: false,
    scope: {
      colourable_type: 'Product',
    },
  },
  foreignKey: 'colourable_id',
  constraints: false,
  as: 'colours',
});

Colour.belongsToMany(Product, {
  through: {
    model: Colourable,
    unique: false,
  },
  foreignKey: 'colour_id',
  constraints: false,
});

Product.belongsToMany(Hashtag, {
  through: {
    model: Hashtagable,
    unique: false,
    scope: {
      hashtagable_type: 'Product',
    },
  },
  foreignKey: 'hashtagable_id',
  constraints: false,
  as: 'hashtags',
});

Hashtag.belongsToMany(Product, {
  through: {
    model: Hashtagable,
    unique: false,
    scope: {
      hashtagable_type: 'Product',
    },
  },
  foreignKey: 'hashtag_id',
  constraints: false,
  as: 'productHashtags',
});

Product.belongsToMany(Material, {
  through: {
    model: Materialable,
    unique: false,
    scope: {
      materialable_type: 'Product',
    },
  },
  foreignKey: 'materialable_id',
  constraints: false,
  as: 'materials',
});

Material.belongsToMany(Product, {
  through: {
    model: Materialable,
    unique: false,
  },
  foreignKey: 'material_id',
  constraints: false,
});

Product.hasMany(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'images',
  scope: {
    imagable_type: 'Product',
  },
});
Product.hasMany(ProductItem, {
  foreignKey: 'product_id',
  sourceKey: 'id',
  constraints: false,
  as: 'items',
});

Product.hasOne(Organisation, {
    foreignKey: 'id',
    sourceKey: 'organisation_id',
    as: 'organisation',
});

export default Product;
