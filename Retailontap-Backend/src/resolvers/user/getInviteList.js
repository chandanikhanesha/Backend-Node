import { Image, Organisation, Role, User } from '../../../models';

export default {
    Query: {
        getInviteList: async (parent, { }, context) => {
            const users = await User.findOne({
                where: {
                    id: context.authUser.id,
                },
                include: [
                    {
                        model: User,
                        as: 'externalUsers',
                        attributes: [
                            'id',
                            'first_name',
                            'last_name',
                            'job_title',
                            'work_email',
                            'mobile',
                            'last_accessed',
                        ],
                        where: {
                            '$externalUsers->Connection.status_id$': 1,
                        },
                        include: [{
                            model: Image,
                            as: 'image',
                            attributes: ['id', 'thumbnail'],
                        }],

                    }
                ],
            });

            const organisation = await User.findOne({
                where: {
                    id: context.authUser.id,
                    '$organisation->externalOrganisations->Connection.status_id$': 1,
                },
                include: [
                    {
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['id', 'name', 'work_phone', 'created_at'],
                        include: [
                            {
                                model: Organisation,
                                as: 'externalOrganisations',
                                attributes: ['id', 'name', 'work_phone', 'created_at'],
                                include: [
                                    {
                                        model: User,
                                        as: 'user',
                                        attributes: ['id', 'first_name', 'last_name', 'work_email'],
                                        include: [
                                            {
                                                model: Role,
                                                as: 'role',
                                                attributes: ['id', 'name'],
                                                where: {
                                                    id: 1,
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        model: Image,
                                        as: 'logo',
                                        attributes: ['id', 'thumbnail'],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });

            const externalUsers = (users && users.externalUsers) || [];

            for (var i = 0; i < externalUsers.length; i++) {
                externalUsers[i].invited_by = externalUsers[i].Connection.invited_by;
                externalUsers[i].token = externalUsers[i].Connection.token
            }

            let externalOrganisations = [];
            if (
                organisation &&
                organisation.organisation &&
                organisation.organisation[0]
            ) {
                externalOrganisations =
                    organisation.organisation[0].externalOrganisations;
            }
            return {
                users: externalUsers,
                organisations: externalOrganisations,
            };
        },
    },
};
