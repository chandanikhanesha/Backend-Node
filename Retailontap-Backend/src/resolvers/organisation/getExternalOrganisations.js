import sequelize from 'sequelize';
import * as OrganisationService from '../../utils/service/OrganisationService';
const Op = sequelize.Op;

export default {
    Query: {
        externalOrganisations: async (parent, { }, context) => {
            let allExternalOrganisations = [];
            let externalUsersOrganisationsIds = [];
            let condition = {};
            let organisation = null;

            //if auth user role is 3 standard
            if (context.authUser.role[0].id === 3) {
                let userCondition = {
                    id: context.authUser.id,
                };
                const searchCondition = { userCondition };
                //Get External Users List
                const users = await OrganisationService.getExternalUsers(
                    searchCondition
                );
                if (users && users.externalUsers && users.externalUsers.length > 0) {
                    externalUsersOrganisationsIds = users.externalUsers.map(
                        (user) => user.organisation[0].id
                    );

                    condition = {
                        id: { [Op.in]: externalUsersOrganisationsIds },
                    };
                }
            }

            if (
                context.authUser.role[0].id === 3 &&
                externalUsersOrganisationsIds.length === 0
            ) {
                allExternalOrganisations = [];
            } else {
                const searchCondition = {
                    externalOrganisationCondition: condition.id ? condition : '',
                    organisationIdCondition: {
                        id: context.authUser.organisation[0].id,
                    },
                };
                organisation = await OrganisationService.getExternalOrganisations(
                    searchCondition
                );
            }

            let connectedOrganizations = [];

            if (organisation && organisation.externalOrganisations) {

                for (var i = 0; i < organisation.externalOrganisations.length; i++) {
                    //Show only organizations who have accepted invite
                    if (organisation.externalOrganisations[i].Connection.status_id === 2) {
                        connectedOrganizations.push(organisation.externalOrganisations[i]);
                    }
                }
                
                allExternalOrganisations = organisation.externalOrganisations;
            }

            return connectedOrganizations;
        },
    },
};
