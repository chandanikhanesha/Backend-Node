import { ReportType } from '../../../models';

export default {
  Query: {
    reportTypes: async () => {
      return ReportType.findAll();
    },
  },
};
