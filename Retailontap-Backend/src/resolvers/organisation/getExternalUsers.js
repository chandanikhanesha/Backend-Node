import * as OrganisationService from '../../utils/service/OrganisationService';

export default {
    Query: {
        externalUsers: async (parent, { }, context) => {
            const allExternalUsers = await OrganisationService.getAllExternalUsers(
                context
            );
            //filter external users who have accepted the invite
            //return allExternalUsers.filter(a => a.Connection.status_id === 2);
            return allExternalUsers;
        },
    },
};
