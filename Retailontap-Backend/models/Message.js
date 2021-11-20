import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Message = sequelize.define(
  'Message',
  {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    content: {
      type: Sequelize.DataTypes.TEXT,
    },
    sender_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    conversation_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    parent_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    quotation_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    sample_id: {
      type: Sequelize.DataTypes.INTEGER,
    },
    read_at: {
      type: Sequelize.DataTypes.DATE,
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
    tableName: 'messages',
  }
);

Message.beforeCreate(async (message) => {
  message.createdAt = message.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Message.beforeUpdate(async (message) => {
  message.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Message;
