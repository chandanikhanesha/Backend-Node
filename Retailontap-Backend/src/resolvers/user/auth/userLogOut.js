import * as auth from '../../../utils/service/auth';
import { response } from '../../../utils/functions';

export default {
  Query: {
    userLogOut: async (parent, {}, context) => {
      const logOut = await auth.logOut(context.authUser.uuid, context.token);
      if (logOut) {
        return response(
          'user-logout',
          'User logged out successfully',
          200,
          null
        );
      } else {
        return response('user-logout', 'User logout failed', 400, null);
      }
    },
  },
};
