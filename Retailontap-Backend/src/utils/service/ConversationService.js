import { generateRandomString } from '../functions';
import s3Upload from '../s3Upload';
import * as ImageService from './ImageService';
import * as OrganisationService from './OrganisationService';

export const associateUsers = async (
    context,
    conversation,
    externalUser,
    internalUsers
) => {
    const organisationIdCondistion = {
        id: context.authUser.organisation[0].id,
    };
    const searchCondition = {
        organisationIdCondistion,
    };
    const internalUsersList = await OrganisationService.getAllInternalUsers(
        searchCondition
    );

    let internalUsersIds = [];

    internalUsersList.map((internalUser) => {
        internalUsersIds.push(internalUser.id);
    });

    let conversationParticipant = [];
    internalUsers.map((user) => {
        if (internalUsersIds.includes(user.id)) {
            conversationParticipant.push(user.id);
        }
    });

    if (!conversationParticipant.includes(context.authUser.id)) {
        conversationParticipant.push(context.authUser.id);
    }
    let addParticipants = null;

    if (conversation !== null) {
        if (conversation.supplier_id) {
            conversationParticipant.push(conversation.supplier_id);
        }

        addParticipants = await conversation.addParticipants(
            conversationParticipant
        );
    }

    if (addParticipants) {
        return true;
    } else {
        return false;
    }
};

export const associateFiles = async (conversation, images) => {
    images.map(async (image) => {
        let currentDate = new Date();
        const imageName = generateRandomString(4) + currentDate.getTime();
        let uploadedImage = null;

        await s3Upload(
            image.file,
            'conversations/' + conversation.id,
            imageName
        ).then(function (res) {
            if (res && res.key) {
                uploadedImage = res;
            }
        });

        if (uploadedImage && uploadedImage.key) {
            await ImageService.createOrUpdateImage(
                'Conversation',
                conversation.id,
                uploadedImage.key,
                null,
                true
            );
        }
    });
};
