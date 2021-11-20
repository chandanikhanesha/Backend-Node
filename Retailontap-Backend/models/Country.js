import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Country = sequelize.define(
  'Country',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    code: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'countries',
  }
);

Country.beforeCreate(async (country) => {
  country.createdAt = country.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Country.beforeUpdate(async (country) => {
  country.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Country.valueExists = async function (query) {
  return Country.findOne({ where: query });
};

export default Country;
