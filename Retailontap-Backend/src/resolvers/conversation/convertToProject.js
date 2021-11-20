import { response, validateForm } from '../../utils/functions';
import { Conversation, Project } from '../../../models';
import * as ProjectService from '../../utils/service/ProjectService';
import * as BaseService from '../../utils/service/BaseService';

export default {
  Mutation: {
    convertToProject: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        conversation_id: 'required|integer',
        name: 'required|string',
        description: 'required|string',
        notes: 'required|string',
        start_date: 'required|string',
        end_date: 'required|string',
        unit_cost: 'required|string',
        markup: 'required|string',
        retail_price: 'required|string',
        budget: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'convert-to-project',
          'Validation failed!',
          422,
          errors
        );
      }

      const conversation = await Conversation.findOne({
        where: {
          id: args.conversation_id,
          created_by: context.authUser.id,
          method: 'conversation',
        },
      });

      if (conversation) {
        let data = args;
        data.created_by = context.authUser.id;
        data.organisation_id = context.authUser.organisation[0].id;

        const project = await Project.create(data);

        conversation.update({
          project_id: project.id,
          method: 'project conversation',
        });

        if (project) {
          await BaseService.associateMaterials(
            project,
            args.materials,
            'Project',
            'convert'
          );
         
          await BaseService.associateImages(
            project,
            args.images,
            'projects',
            'Project'
          );

          await ProjectService.associateExternalUsers(
            context,
            project,
            args.externalUsers,
            args.internalUsers,
            'convert'
          );

          await BaseService.associateHashtags(
            project,
            args.hashtags,
            'Project',
            'convert'
          );
        }
      }

      return response(
        'convert-to-project',
        'Conversation successfully converted to project',
        200,
        null
      );
    },
  },
};
