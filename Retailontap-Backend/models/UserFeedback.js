import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const UserFeedback = sequelize.define(
    'UserFeedback',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },  
        feedbacktype_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        feedback_message: {
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
        tableName: 'user_feedbacks',
    }
);

UserFeedback.beforeCreate(async (userFeedback) => {
    userFeedback.createdAt = userFeedback.updatedAt = getDatabaseInsertableTime(
        0,
        'days'
    );
});

UserFeedback.beforeUpdate(async (userFeedback) => {
    userFeedback.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default UserFeedback;