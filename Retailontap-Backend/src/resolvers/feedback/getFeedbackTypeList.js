import { Feedback } from '../../../models';

export default {
  Query: {
    FeedbackTypes: async (parent, args, context) => {
      return Feedback.findAll({               
         attributes: ['id','name']
      });
    },
  },
};