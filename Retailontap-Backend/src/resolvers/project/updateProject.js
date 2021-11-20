import { response, validateForm } from '../../utils/functions';
import { Project } from '../../../models';
import * as ProjectService from '../../utils/service/ProjectService';
import * as BaseService from '../../utils/service/BaseService';

export default {
  Mutation: {
    updateProject: async (parent, args, context) => {
      let errors = null;

      args.materials = JSON.parse(JSON.stringify(args.materials));
      args.images = JSON.parse(JSON.stringify(args.images));
      args.internalUsers = JSON.parse(JSON.stringify(args.internalUsers));
      args.externalUsers = JSON.parse(JSON.stringify(args.externalUsers));
      args.hashtags = JSON.parse(JSON.stringify(args.hashtags));

      const validationRule = {
        id: 'required|integer',
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
        return response('update-project', 'Validation failed!', 422, errors);
      }

      const project = await Project.update(args, {
        where: {
          id: args.id,
        },
        returning: true,
      });
      if (project[1] && project[1][0]) {
        await BaseService.associateMaterials(
          project[1][0],
          args.materials,
          'Project',
          'update'
        );

        await BaseService.associateImages(
          project[1][0],
          args.images,
          'projects',
          'Project'
        );

        await ProjectService.associateExternalUsers(
          context,
          project[1][0],
          args.externalUsers,
          args.internalUsers,
          'update'
        );

        await BaseService.associateHashtags(
          project[1][0],
          args.hashtags,
          'Project',
          'update'
        );
      }

      return response(
        'update-project',
        'Project updated successfully',
        200,
        null
      );
    },
  },
};
