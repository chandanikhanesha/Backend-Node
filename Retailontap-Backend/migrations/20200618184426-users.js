'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    return Promise.all([
      queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        uuid: { type: Sequelize.TEXT, allowNull: false },
        first_name: { type: Sequelize.TEXT },
        last_name: { type: Sequelize.TEXT },
        password: { type: Sequelize.TEXT, allowNull: true, defaultValue: null },
        job_title: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        work_email: { type: Sequelize.TEXT, allowNull: false, unique: true },
        phone_number: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        department: {
          type: Sequelize.DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        language_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        time_zone_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: null,
          references: {
            model: 'countries',
            key: 'id',
          },
        },
        city: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        mobile: { type: Sequelize.TEXT, allowNull: true, defaultValue: null },
        activated: { type: Sequelize.BOOLEAN, defaultValue: false },
        invited_by: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
        payment_method_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        stripe_customer_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        two_step_verification: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        last_accessed: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        device_id: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        is_email_auth_enabled: { type: Sequelize.BOOLEAN, defaultValue: false },
        is_google_auth_enabled: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        default_auth_method: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        email_auth_code: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: null,
        },
      }),
      //queryInterface.addColumn('users', 'device_id', Sequelize.TEXT),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
          */
    return queryInterface.dropTable('users');
  },
};
