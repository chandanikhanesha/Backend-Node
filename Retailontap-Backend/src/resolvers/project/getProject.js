import {
  Conversation,
  Hashtag,
  Image,
  Material,
  Project,
  User,
} from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    project: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-project', 'Validation failed!', 422, errors);
      }
      const project = await Project.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
          created_by: context.authUser.id,
        },
        include: [
          {
            model: Conversation,
            as: 'conversations',
            where: {
              method: 'project conversation',
            },
            include: [
              {
                model: User,
                as: 'participants',
                include: [
                  {
                    model: Image,
                    as: 'image',
                    attributes: ['id','thumbnail'],
                  },
                ]
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
          {
            model: Material,
            as: 'materials',
          },
        ],
      });
      return project;
    },
  },
};
