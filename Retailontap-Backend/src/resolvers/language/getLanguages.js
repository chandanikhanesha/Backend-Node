import { Language } from '../../../models';

export default {
  Query: {
    languages: async () => {
      return Language.findAll();
    },
  },
};
