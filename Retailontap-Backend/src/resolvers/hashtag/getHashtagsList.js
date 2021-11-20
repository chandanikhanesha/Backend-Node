import { Hashtag } from '../../../models';

export default {
  Query: {
    hashtags: async () => {
      return Hashtag.findAll();
    },
  },
};
