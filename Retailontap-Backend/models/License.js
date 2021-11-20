import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Price from './Price';

const License = sequelize.define(
  'License',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    license_id: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    livemode: {
      type: Sequelize.DataTypes.BOOLEAN,
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
    tableName: 'licenses',
  }
);

License.beforeCreate(async (license) => {
  license.createdAt = license.updatedAt = getDatabaseInsertableTime(0, 'days');
});

License.beforeUpdate(async (license) => {
  license.updatedAt = getDatabaseInsertableTime(0, 'days');
});

License.hasMany(Price, {
  foreignKey: 'license_id',
  sourceKey: 'license_id',
  as: 'prices',
});

export default License;
