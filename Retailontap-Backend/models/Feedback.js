import Sequelize from 'sequelize';
import { sequelize } from '../src/utils/variables';
import { getDatabaseInsertableTime } from '../src/utils/functions';

const Feedback = sequelize.define(
    'Feedback',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: Sequelize.TEXT },
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
        tableName: 'feedback_types',
    }
);

Feedback.beforeCreate(async (feedback) => {
    feedback.createdAt = feedback.updatedAt = getDatabaseInsertableTime(0, 'days');
});

Feedback.beforeUpdate(async (feedback) => {
    feedback.updatedAt = getDatabaseInsertableTime(0, 'days');
});

export default Feedback;