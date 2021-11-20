import { ReportTemplate, ReportColumn } from '../../../models';

export default {
  Query: {
    reportTemplates: async (parent, args, context) => {
      return ReportTemplate.findAll({
        attributes: ['id', 'name'],
        include: [
          {
            model: ReportColumn,
            as: 'columns',
          },
        ],
      });
    },
  },
};
