import { Reason } from '../../../models';

export default {
  Query: {
    reasons: async () => {
      return Reason.findAll();
    },
  },
};
