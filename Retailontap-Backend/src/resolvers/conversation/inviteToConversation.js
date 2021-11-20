import { response, validateForm } from '../../utils/functions';
import { Conversation } from '../../../models';
import * as ConversationService from '../../utils/service/ConversationService';

export default {
    Mutation: {
        inviteToConversation: async (parent, args, context) => {
            let errors = null;

            args.internalUsers = JSON.parse(JSON.stringify(args.internalUsers));
            args.externalUser = JSON.parse(JSON.stringify(args.externalUser));

            const validationRule = {
                id: 'required|integer',
                internalUsers: 'required',
                externalUser: 'required',
            };

            const validation = await validateForm(args, validationRule);
            if (validation.errors) {
                errors = JSON.stringify(validation.errors);
                return response(
                    'invite-to-conversation',
                    'Validation failed!',
                    422,
                    errors
                );
            }

            let conversation = await Conversation.findOne({
                where: {
                    id: args.id,
                    created_by: context.authUser.id,
                    method: 'conversation',
                },
            });

            //conversation.update({ conversation });

            if (conversation !== null) {
                if (conversation.supplier_id && args.externalUser.id) {
                    await conversation.update({ supplier_id: args.externalUser.id });
                }
            }

            await ConversationService.associateUsers(
                context,
                conversation,
                args.externalUser,
                args.internalUsers
            );

            return response(
                'invite-to-conversation',
                'Users successfully invited to the conversation',
                200,
                null
            );
        },
    },
};
