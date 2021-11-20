import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import Material from './Material';
import Image from './Image';
import Hashtag from './Hashtag';
import Conversation from './Conversation';
import Hashtagable from './Hashtagable';
import Materialable from './Materialable';
import Product from './Product';
import Report from './Report';
import User from './User';
import ProjectSupplier from './ProjectSupplier';

const Project = sequelize.define(
  'Project',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    description: { type: Sequelize.DataTypes.TEXT },
    notes: {
      type: Sequelize.DataTypes.TEXT,
    },
    created_by: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    organisation_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: Sequelize.DataTypes.DATE,
    },
    end_date: {
      type: Sequelize.DataTypes.DATE,
    },
    unit_cost: {
      type: Sequelize.DataTypes.TEXT,
    },
    markup: {
      type: Sequelize.DataTypes.TEXT,
    },
    retail_price: {
      type: Sequelize.DataTypes.TEXT,
    },
    budget: {
      type: Sequelize.DataTypes.TEXT,
    },
    product_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    report_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: Sequelize.DataTypes.TEXT,
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
    tableName: 'projects',
  }
);

Project.beforeCreate(async (project) => {
  project.createdAt = project.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Project.beforeUpdate(async (project) => {
  project.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Project.hasOne(User, {
  foreignKey: 'id',
  sourceKey: 'created_by',
  as: 'creator',
});

Project.hasMany(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'images',
  scope: {
    imagable_type: 'Project',
  },
});

Project.hasMany(Conversation, {
  foreignKey: 'project_id',
  sourceKey: 'id',
  as: 'conversations',
});

Product.hasOne(Project, {
  foreignKey: 'product_id',
  sourceKey: 'id',
  as: 'projectProduct',
});

Project.belongsTo(Product, {
  as: 'product',
});

Report.hasOne(Project, {
  foreignKey: 'report_id',
  sourceKey: 'id',
  as: 'projectReport',
});

Project.belongsTo(Report, {
  as: 'report',
});

Project.belongsToMany(Hashtag, {
  through: {
    model: Hashtagable,
    unique: false,
    scope: {
      hashtagable_type: 'Project',
    },
  },
  foreignKey: 'hashtagable_id',
  constraints: false,
  as: 'hashtags',
});

Hashtag.belongsToMany(Project, {
  through: {
    model: Hashtagable,
    unique: false,
  },
  foreignKey: 'hashtag_id',
  constraints: false,
  as: 'projectHashtags',
});

Project.belongsToMany(Material, {
  through: {
    model: Materialable,
    unique: false,
    scope: {
      materialable_type: 'Project',
    },
  },
  foreignKey: 'materialable_id',
  constraints: false,
  as: 'materials',
});

Material.belongsToMany(Project, {
  through: {
    model: Materialable,
    unique: false,
  },
  foreignKey: 'material_id',
  constraints: false,
});

Project.hasMany(ProjectSupplier, {
  foreignKey: 'project_id',
  sourceKey: 'id',
  as: 'projectsuppliers'
});

export default Project;
