import { response, validateForm } from '../../utils/functions';
import { Conversation, Hashtag, Image, Project, User } from '../../../models';

export default {
  Mutation: {
    projectConversations: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'project-conversation',
          'Validation failed!',
          422,
          errors
        );
      }

      const project = await Project.findOne({
        where: {
          organisation_id: context.authUser.organisation[0].id,
        },
        include: [
          {
            model: Conversation,
            as: 'conversations',
            where: {
              method: 'project conversation',
              project_id: args.id,
            },
            include: [
              {
                model: User,
                as: 'participants',
              },
            ],
          },
          {
            model: Hashtag,
            as: 'hashtags',
          },
          {
            model: Image,
            as: 'images',
          },
        ],
      });

      return {
        path: 'project-conversations',
        message: 'Project conversations',
        code: 200,
        errors: null,
        project: project,
      };
    },
  },
};
