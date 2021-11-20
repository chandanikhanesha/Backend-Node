import { response, validateForm } from '../../utils/functions';
import { Conversation, Hashtag, Image, User } from '../../../models';

export default {
  Mutation: {
    getConversation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-conversation', 'Validation failed!', 422, errors);
      }

      const conversation = await Conversation.findOne({
        where: {
          id: args.id,
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

      return {
        path: 'get-conversation',
        message: 'Get conversation',
        code: 200,
        errors: null,
        conversation: conversation,
      };
    },
  },
};
