import { response, validateForm } from '../../utils/functions';
import { Conversation } from '../../../models';

export default {
  Mutation: {
    deleteConversation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'delete-conversation',
          'Validation failed!',
          422,
          errors
        );
      }

      const destroyConversation = await Conversation.destroy({
        where: {
          id: args.id,
          created_by: context.authUser.id,
          method: 'conversation',
        },
      });

      if (destroyConversation) {
        return response(
          'delete-conversation',
          'Conversation deleted successfully.',
          200,
          null
        );
      } else {
        return response(
          'delete-conversation',
          'Delete conversation failed.',
          400,
          null
        );
      }
    },
  },
};
