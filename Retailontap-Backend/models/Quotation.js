import Sequelize from "sequelize";
import { sequelize } from "../src/utils/variables";
import { getDatabaseInsertableTime } from "../src/utils/functions";
import User from "./User";
import Project from "./Project";
import QuotationItems from "./QuotationItems";

const Quotation = sequelize.define(
  "Quotation",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    retailer_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    supplier_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    project_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_date: {
      type: Sequelize.DataTypes.DATE,
    },
    transportation_type: {
      type: Sequelize.DataTypes.STRING,
    },
    total: {
      type: Sequelize.DECIMAL,
    },
    is_submited: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
    },
    product_style: {
      type: Sequelize.DataTypes.STRING,
    },
    colour: {
      type: Sequelize.DataTypes.STRING,
    },
    size: {
      type: Sequelize.DataTypes.STRING,
    },
    total_units: {
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      type: Sequelize.DataTypes.STRING,
    },
    quotation_type: {
      type: Sequelize.DataTypes.STRING,
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
    tableName: "quotations",
  }
);

Quotation.beforeCreate(async (quotation) => {
  quotation.createdAt = quotation.updatedAt = getDatabaseInsertableTime(
    0,
    "days"
  );
});

Quotation.beforeUpdate(async (quotation) => {
  quotation.updatedAt = getDatabaseInsertableTime(0, "days");
});
Quotation.hasOne(Project, {
  foreignKey: "id",
  sourceKey: "project_id",
  as: "project",
});
Project.hasMany(Quotation, {
  as: "quotation",
});
Quotation.hasOne(User, {
  foreignKey: "id",
  sourceKey: "retailer_id",
  as: "retailer",
});
Quotation.hasOne(User, {
  foreignKey: "id",
  sourceKey: "supplier_id",
  as: "supplier",
});

User.hasMany(Quotation, {
  foreignKey: "supplier_id",
  sourceKey: "id",
  as: "supplierQuotation",
});

User.hasMany(Quotation, {
  foreignKey: "retailer_id",
  sourceKey: "id",
  as: "retailerQuotation",
});
Quotation.hasMany(QuotationItems, {
  foreignKey: "quotation_id",
  sourceKey: "id",
  as: "items",
});
QuotationItems.belongsTo(Quotation, {
  as: "quotation",
});

export default Quotation;
