import { TimeZone } from '../../../models';

export default {
  Query: {
    timeZones: async () => {
      return TimeZone.findAll();
    },
  },
};
