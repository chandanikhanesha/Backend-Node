import * as UserService from '../../utils/service/UserService';

export default {
  Query: {
    organisationAdministrators: async (parent, {}, context) => {
      const userCondition = {
        is_active: true,
      };
      return await UserService.getOrganisationAdminUsers(
        context.authUser.organisation[0].id,
        userCondition
      );
    },
  },
};
