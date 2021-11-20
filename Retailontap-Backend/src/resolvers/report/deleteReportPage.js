const { Op } = require('sequelize');
import { response, validateForm } from '../../utils/functions';
import { ReportPage } from '../../../models';

export default {
  Mutation: {
    deleteReportPage: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        report_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'delete-report-page',
          'Validation failed!',
          422,
          errors
        );
      }
      try {
        const pageIds = args.page_ids.map(({ id }) => id);
        await ReportPage.destroy({
          where: {
            id: {
              [Op.in]: pageIds,
            },
            report_id: args.report_id,
          },
        });
        return {
          path: 'delete-report-page',
          message: 'Report Page deleted  successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'delete-report-page',
          message: 'Report Page deleted failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
