import { getDatabaseInsertableTime } from '../utils/functions';
import * as auth from '../utils/service/auth';
import { Organisation, Role, User, UserDevice } from '../../models';

// userLogin Resolver
export default {
  Mutation: {
    userLogIn: async (
      parent,
      { work_email, password, device_type, device_id }
    ) => {
      let error = null;
      // const username = await getUUID(work_email);

      const user = await User.findOne({
        where: { work_email },
        include: [
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name', 'deleted_at'],
            paranoid: false,
          },
          {
            model: Role,
            as: 'role',
            attributes: ['id', 'name'],
          },
        ],
      });

      if (!user) {
        return {
          path: 'user-login',
          message: 'User does not exist.',
          code: 400,
          errors: null,
          token: null,
        };
      }

      if (
        user &&
        device_type === 'web' &&
        (user.role[0].id === parseInt(process.env.STANDARD_ROLE_ID) ||
          user.role[0].id === parseInt(process.env.STAKEHOLDER_ROLE_ID))
      ) {
        return {
          path: 'user-login',
          message: 'You need to login via the App to use this service.',
          code: 400,
          errors: null,
          token: null,
        };
      }
      
      await auth.checkOrganisationAvailability(user);

      await auth.checkUserIsActive(user);

      let tokens = {};

      await new Promise((resolve) => {
        // create access jwt token via aws cognito
        auth.userLogin(user.uuid, password, (err, token) => {
          if (err) {
            error = {
              path: 'aws-cognito',
              message: err.message,
              code: 400,
              errors: null,
              token: null,
            };
          } else {
            tokens = token; // jwt tokens
          }
          resolve(true);
        });
      });

      if (error !== null) return error;

          if ((user.is_email_auth_enabled && user.default_auth_method === 'Email') || (user.is_google_auth_enabled && user.default_auth_method === 'Google Authenticator')) {
              //Update last_accessed
              await User.update(
                  { last_accessed: getDatabaseInsertableTime(0, 'days'), device_type },
                  { where: { uuid: user.uuid } }
              );
          }
          else {
              //Update last_accessed
              await User.update(
                  { last_accessed: getDatabaseInsertableTime(0, 'days'), device_id, device_type },
                  { where: { uuid: user.uuid } }
              );

              // check device existance
              const existDevice = await UserDevice.findOne({
                  where: { device_id: device_id },
              });

              if (existDevice) {
                  // update user_id if already exist
                  await UserDevice.update(
                      { user_id: user.id },
                      { where: { id: existDevice.id } }
                  );
              }
              else {
                  // save new device
                  await UserDevice.create({
                      user_id: user.id,
                      device_id: device_id,
                      device_type: device_type
                  });
              }
          }

      return {
        path: 'token',
        message: 'token',
        code: 200,
        errors: null,
        token: tokens,
      };
    },
  },
};
