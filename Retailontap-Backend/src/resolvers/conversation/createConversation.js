import {
  generateRandomString,
  response,
  validateForm,
} from '../../utils/functions';
import * as ConversationService from '../../utils/service/ConversationService';
import { Conversation, Product } from '../../../models';
import * as OrganisationService from '../../utils/service/OrganisationService';
import * as BaseService from '../../utils/service/BaseService';

export default {
  Mutation: {
    createConversation: async (parent, args, context) => {
      let errors = null;

      args.files = JSON.parse(JSON.stringify(args.files));
      args.internalUsers = JSON.parse(JSON.stringify(args.internalUsers));
      args.externalUser = JSON.parse(JSON.stringify(args.externalUser));
      args.hashtags = JSON.parse(JSON.stringify(args.hashtags));

      const validationRule = {
        subject: 'required',
        description: 'required',
        internalUsers: 'required',
        externalUser: 'required',
        product_id: 'integer',
        report_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'create-conversation',
          'Validation failed!',
          422,
          errors
        );
      }

      const externalUsersList = await OrganisationService.getAllExternalUsers(
        context
      );

      let externalUsersIds = [];

      externalUsersList.map((externalUser) => {
        externalUsersIds.push(externalUser.id);
      });

      if (
        (args.externalUser.id &&
          externalUsersIds.includes(args.externalUser.id)) ||
        !args.externalUser.id
      ) {
        const conversation = await Conversation.create({
          name: '',
          description: args.description,
          subject: args.subject,
          channel_id: generateRandomString(20),
          network: 'external',
          method: 'conversation',
          created_by: context.authUser.id,
          supplier_id: args.externalUser.id ? args.externalUser.id : null,
          project_id: null,
          product_id: args.product_id || null,
          report_id: args.report_id || null,
        });

        if (conversation) {
          await ConversationService.associateUsers(
            context,
            conversation,
            args.externalUser,
            args.internalUsers
          );

          await BaseService.associateHashtags(
            conversation,
            args.hashtags,
            'Conversation',
            'create'
          );

          await ConversationService.associateFiles(conversation, args.files);

          if (args.product_id) {
            await Product.increment('requested', {
              by: 1,
              where: {
                id: args.product_id,
              },
            });
          }
        }
      } else {
        return response(
          'create-conversation',
          'You can only select external users from the same organisation',
          400,
          null
        );
      }

      return response(
        'create-conversation',
        'Conversation created successfully',
        200,
        null
      );
    },
  },
};
