import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Language = sequelize.define(
  'Language',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
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
    tableName: 'languages',
  }
);

Language.beforeCreate(async (language) => {
  language.createdAt = language.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Language.beforeUpdate(async (language) => {
  language.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Language;
