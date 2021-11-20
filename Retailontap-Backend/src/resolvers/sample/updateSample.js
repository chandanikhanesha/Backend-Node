import { response, validateForm } from '../../utils/functions';
import { Sample, ProjectSupplier, Project } from '../../../models';

export default {
  Mutation: {
    updateSample: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        received_date: 'string',
        is_submited: 'boolean',
        track_number: 'string',
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('update-sample', 'Validation failed!', 422, errors);
      }
      try {
        const sample = await Sample.update(
          {
            received_date: args.received_date,
            track_number: args.track_number,
            is_submited: args.is_submited,
          },
          {
            where: {
              id: args.id,
            },
            returning: true,
          }
        );
        if (args.is_submited) {
          await ProjectSupplier.update(
            {
              status_id: 4,
            },
            {
              where: {
                project_id: args.project_id,
                supplier_id:args.supplier_id
              },
            }
          );

          await Project.update(
            {
              status: 'Sample Received',
            },
            {
              where: {
                id: sample[1][0].project_id,
              },
            }
          );
        }
        return {
          path: 'update-sample',
          message: 'Sample updated successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'update-sample',
          message: 'Sample update failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
