import express from 'express';
import serverless from 'serverless-http';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './src/resolvers';
import typeDefs from './src/types';
import * as auth from './src/utils/service/auth';
import 'pg';
import schemaDirectives from './src/directives/schemaDirectives';
import { Organisation, User, Role, Image, Country } from './models';

const cors = require('cors');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: async ({ req }) => {
    let token = null;
    let user = null;
    let authUser = null;
    try {
      token = req.headers.authorization || '';
      if (token) {
        token = token.replace('Bearer ', '');
        await auth.tradeTokenForUser(token).then(async function (currentUser) {
          user = currentUser;

          await User.findOne({
            where: { uuid: user.sub },
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name', 'organisation_type', 'deleted_at'],
                paranoid: false,
                include: [{
                   model: Image,
                   as: 'logo',
                   attributes: ['id','thumbnail'],
			   }]
              },
              {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
              },
              {
                model: Country,
                as: 'country',
                attributes: ['id', 'name'],
              },
              {
                model: Image,
                as: 'image',
                attributes: ['thumbnail'],
              },
            ],
          }).then((auth) => {
            authUser = auth;
          });
        });
      }
    } catch (e) {
      throw new Error('Unable to authenticate using auth token.');
    }

    await auth.checkOrganisationAvailability(authUser);

    return {
      token,
      user,
      authUser,
    };
  },
  path: '/graphql',
});

server.applyMiddleware({
    app,
    bodyParserConfig: {
        limit: '100mb', // Your Limited Here
    }
});

const handler = serverless(app);

export { handler };
