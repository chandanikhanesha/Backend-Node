import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import UserOrganisationRole from './UserOrganisationRole';
import Organisation from './Organisation';
import Role from './Role';
import Connection from './Connection';
import Subscription from './Subscription';
import Image from './Image';
import Country from './Country';
import Hashtag from './Hashtag';
import Hashtagable from './Hashtagable';

// create user model
const User = sequelize.define(
  'User',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: { type: Sequelize.DataTypes.TEXT },
    first_name: { type: Sequelize.DataTypes.TEXT },
    last_name: { type: Sequelize.DataTypes.TEXT },
    password: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    department: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    job_title: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    work_email: { type: Sequelize.DataTypes.TEXT },
    phone_number: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    language_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    time_zone_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    country_id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    mobile: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    activated: { type: Sequelize.DataTypes.BOOLEAN, defaultValue: false },
    invited_by: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
    payment_method_id: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    stripe_customer_id: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    two_step_verification: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    email_auth_code: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_email_auth_enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    is_google_auth_enabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    default_auth_method: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    last_accessed: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    device_id: {
      type: Sequelize.DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    device_type: {
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
    underscored: true,
    tableName: 'users',
  }
);

User.beforeCreate(async (user) => {
  user.createdAt = user.updatedAt = getDatabaseInsertableTime(0, 'days');
});

User.beforeUpdate(async (user) => {
  user.updatedAt = getDatabaseInsertableTime(0, 'days');
});

// User.hasOne(Organisation, { foreignKey: 'owner_id', as: 'organisation' });
// Organisation.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
User.belongsToMany(Organisation, {
  through: UserOrganisationRole,
  as: 'organisation',
});

Organisation.belongsToMany(User, {
  through: UserOrganisationRole,
  as: 'user',
});

User.belongsToMany(Role, {
  through: UserOrganisationRole,
  as: 'role',
});

Organisation.belongsToMany(Role, {
  through: UserOrganisationRole,
  as: 'role',
});

User.belongsToMany(User, {
  through: {
    model: Connection,
    unique: false,
    scope: {
      model: 'User',
    },
  },
  as: 'externalUsers',
  foreignKey: 'from',
  otherKey: 'to',
  constraints: false,
});

Organisation.belongsToMany(Organisation, {
  through: {
    model: Connection,
    unique: false,
    scope: {
      model: 'Organisation',
    },
  },
  as: 'externalOrganisations',
  foreignKey: 'from',
  otherKey: 'to',
  constraints: false,
});

User.hasMany(Subscription, {
  foreignKey: 'customer_id',
  sourceKey: 'stripe_customer_id',
  as: 'subscriptions',
});

User.hasOne(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'image',
  scope: {
    imagable_type: 'User',
  },
});

User.hasOne(Country, {
  foreignKey: 'id',
  sourceKey: 'country_id',
  as: 'country',
});

User.belongsToMany(Hashtag, {
  through: {
    model: Hashtagable,
    unique: false,
    scope: {
      hashtagable_type: 'ExternalUser',
    },
  },
  foreignKey: 'hashtagable_id',
  constraints: false,
  as: 'externalUserHashtags',
});

export default User;
