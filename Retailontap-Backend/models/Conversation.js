import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';
import User from './User';
import ConversationParticipant from './ConversationParticipant';
import Hashtag from './Hashtag';
import Image from './Image';
import Hashtagable from './Hashtagable';
import Product from './Product';
import Report from './Report';
import Message from './Message';

const Conversation = sequelize.define(
  'Conversation',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.DataTypes.TEXT },
    description: { type: Sequelize.DataTypes.TEXT },
    subject: { type: Sequelize.DataTypes.TEXT },
    channel_id: { type: Sequelize.DataTypes.TEXT },
    network: {
      type: Sequelize.DataTypes.ENUM(
        'internal',
        'external',
        'both',
        'inactive'
      ),
    },
    method: {
      type: Sequelize.DataTypes.ENUM('conversation', 'project conversation'),
    },
    supplier_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    created_by: {
      type: Sequelize.DataTypes.INTEGER,
    },
    project_id: {
      type: Sequelize.DataTypes.INTEGER,
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
    tableName: 'conversations',
  }
);

Conversation.beforeCreate(async (conversation) => {
  conversation.createdAt = conversation.updatedAt = getDatabaseInsertableTime(
    0,
    'days'
  );
});

Conversation.beforeUpdate(async (conversation) => {
  conversation.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Conversation.belongsToMany(User, {
  through: ConversationParticipant,
  as: 'participants',
});

User.belongsToMany(Conversation, {
  through: ConversationParticipant,
  as: 'conversations',
});

Product.hasOne(Conversation, {
  foreignKey: 'product_id',
  sourceKey: 'id',
  as: 'productConversation',
});

Conversation.belongsTo(Product, {
  as: 'product',
});

Conversation.hasMany(Image, {
  foreignKey: 'imagable_id',
  constraints: false,
  as: 'files',
  scope: {
    imagable_type: 'Conversation',
  },
});

Conversation.belongsToMany(Hashtag, {
  through: {
    model: Hashtagable,
    unique: false,
    scope: {
      hashtagable_type: 'Conversation',
    },
  },
  foreignKey: 'hashtagable_id',
  constraints: false,
  as: 'hashtags',
});

Hashtag.belongsToMany(Conversation, {
  through: {
    model: Hashtagable,
    unique: false,
  },
  foreignKey: 'hashtag_id',
  constraints: false,
});

Report.hasOne(Conversation, {
  foreignKey: 'report_id',
  sourceKey: 'id',
  as: 'reportConversation',
});

Conversation.belongsTo(Report, {
  as: 'report',
});

Conversation.hasMany(Message, {
  foreignKey: 'conversation_id',
  sourceKey: 'id',
  as: 'messages',
});

export default Conversation;
