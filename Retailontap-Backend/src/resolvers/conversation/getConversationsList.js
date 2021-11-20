import { Conversation, Hashtag, User, Image } from '../../../models';

export default {
  Query: {
    conversations: async (parent, args, context) => {
      return Conversation.findAll({
        where: {
          created_by: context.authUser.id,
          method: 'conversation',
        },
        include: [
          {
            model: Hashtag,
            as: 'hashtags',
          },
          {
            model: User,
            as: 'participants',
          },
          {
            model: Image,
            as: 'files',
          },
        ],
      });
    },
  },
};
