import { response, validateForm } from '../../utils/functions';
import { Report } from '../../../models';

export default {
  Mutation: {
    createReport: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        name: 'required|string',
        type_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return { path:'create-report', message:'Validation failed!', code:422, errors:errors, report_id:0 };
      }

      const report = await Report.create({
        name: args.name,
        type_id: args.type_id,
        user_id: context.authUser.id,
      });
      if (report && report.id) {
        return {
          path: 'create-report',
          message: 'Report created successfully!',
          code: 200,
          errors: null,
          report_id:report.id
        };
      }
      return {
        path: 'create-report',
        message: 'Report create failed!',
        code: 400,
        errors: null,
        report_id:0
      };
    },
  },
};
