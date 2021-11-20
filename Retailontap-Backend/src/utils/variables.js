import Sequelize from 'sequelize';
import * as AWS from 'aws-sdk';
import awsConfig from './awsConfig';

// set the sequelize
const sequelize = new Sequelize(
  `postgres://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
);

export { sequelize };

// set the region
AWS.config.update(awsConfig);

export { AWS };
