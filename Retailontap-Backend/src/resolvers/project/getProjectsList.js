import * as ProjectService from '../../utils/service/ProjectService';

export default {
  Query: {
    projects: async (parent, args, context) => {
      const condition = {
        projectCondition: {
          organisation_id: context.authUser.organisation[0].id,
          created_by: context.authUser.id,
        },
        required: false,
      };
      return await ProjectService.getProjects({ condition });
    },
  },
};
