import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Image = sequelize.define(
  'Image',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imagable_id: { type: Sequelize.DataTypes.INTEGER },
    parent_id: { type: Sequelize.DataTypes.INTEGER },
    imagable_type: { type: Sequelize.DataTypes.TEXT },
    thumbnail: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'images',
  }
);

Image.beforeCreate(async (image) => {
  image.createdAt = image.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Image.beforeUpdate(async (image) => {
  image.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Image;
