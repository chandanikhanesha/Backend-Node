import {
    Connection,
    Image,
    Organisation,
    Role,
    User,
    UserOrganisationRole,
    Country,
    Hashtag,
} from '../../../models';
import sequelize from 'sequelize';
import { generateRandomString } from '../functions';
import * as EmailService from './EmailService';
const Op = sequelize.Op;

export const createOrganisation = (data) => {
    return Organisation.create(data).then((organisation) => {
        return organisation;
    });
};

export const getOrganisationOwner = async (orgId) => {
    const owner = await User.findOne({
        attributes: ['id', 'work_email'],
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
                where: {
                    id: orgId,
                },
                paranoid: false,
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
                where: {
                    id: 1,
                },
            },
        ],
    });

    return owner;
};

export const getOrganisationByEmail = async (email) => {
    const organisation = await Organisation.findOne({
        attributes: ['id', 'name'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'work_email'],
                where: {
                    work_email: email,
                },
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
                where: {
                    id: parseInt(process.env.OWNER_ROLE_ID),
                },
            },
        ],
    });

    return organisation;
};

export const getOrganisationByLink = async (link) => {
    const organisation = await Organisation.findOne({
        attributes: ['id', 'name', 'invite_link'],
        where: { invite_link: link },
    });

    return organisation;
};

export const getOrganisationLink = (url) => {
    return url.substring(url.lastIndexOf('/') + 1);
};

export const getExternalUsers = async (searchCondition) => {
    let search = {};
    if ('externalUserSearchCondition' in searchCondition) {
        search = {
            [Op.or]: [
                ...searchCondition.externalUserSearchCondition,
                searchCondition.organisationExternalUserCondition,
                searchCondition.roleExternalUserCondition,
            ],
        };
    }
    const users = await User.findOne({
        attributes: ['id', 'work_email'],
        include: [
            {
                model: User,
                as: 'externalUsers',
                attributes: [
                    'id',
                    'first_name',
                    'last_name',
                    'job_title',
                    'department',
                    'phone_number',
                    'work_email',
                    'mobile',
                    'last_accessed',
                    'city',
                ],
                where: searchCondition.externalUserCondition || {},
                include: [
                    {
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['id', 'name', 'organisation_type'],
                        where: searchCondition.organisationCondition || {},
                    },
                    {
                        model: Image,
                        as: 'image',
                        attributes: ['id', 'thumbnail'],
                    },
                    {
                        model: Role,
                        as: 'role',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Country,
                        as: 'country',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: Hashtag,
                        as: 'externalUserHashtags',
                    },
                ],
            },
        ],
        where: {
            ...searchCondition.userCondition,
            ...search,
        },
    });
    return users;
};

export const getAllExternalUsers = async (context) => {
    let allExternalUsers = [];
    let externalUsersIds = [];
    let condition = {};
    let externalUsersOrganisationsIds = [];

    let userCondition = {
        id: context.authUser.id,
    };
    const searchCondition = { userCondition };
    //Get External Users List
    const users = await getExternalUsers(searchCondition);

    if (users && users.externalUsers && users.externalUsers.length > 0) {
        externalUsersIds = users.externalUsers.map((user) => user.id);
        allExternalUsers = users.externalUsers;
    } else {
        externalUsersIds = [];
    }

    const connections = await Connection.findAll({
        where: {
            [Op.or]: [
                { from: context.authUser.organisation[0].id },
                { to: context.authUser.organisation[0].id },
            ],
            model: 'Organisation',
        },
    });

    const organisations = connections.map((connection) => {
        if (connection.from !== context.authUser.organisation[0].id) {
            return connection.from;
        }
    });
    //if auth user role is Standard
    if (context.authUser.role[0].id === 3) {
        if (users && users.externalUsers) {
            externalUsersOrganisationsIds = users.externalUsers.map(
                (user) => user.organisation[0].id
            );

            condition = {
                id: { [Op.in]: externalUsersOrganisationsIds },
            };
        }
        else {
            organisations && organisations.map((organisation) => {
                if (organisation) {
                    externalUsersOrganisationsIds.push(organisation);
                }
            });

            condition = {
                id: { [Op.in]: organisation },
            }
        }
    } else if (
        //if auth user role is Admin or Owner
        context.authUser.role[0].id === 1 ||
        context.authUser.role[0].id === 2
    ) {
        condition = {
            id: { [Op.in]: organisations },
        };
    }

    //Get external users from connected organisations
    const usersOfExternalOrganisation = await User.findAll({
        where: {
            id: { [Op.notIn]: externalUsersIds },
        },
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
                where: condition,
            },
            {
                model: Image,
                as: 'image',
                attributes: ['id', 'thumbnail'],
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
            },
            {
                model: Country,
                as: 'country',
                attributes: ['id', 'name'],
            },
            {
                model: Hashtag,
                as: 'externalUserHashtags',
            },
        ],
    });

    if (usersOfExternalOrganisation && usersOfExternalOrganisation.length > 0) {
        allExternalUsers.push(...usersOfExternalOrganisation);
    }

    return allExternalUsers;
};

export const getAllExternalUsersByUserId = async (context, userId) => {
    let allExternalUsers = [];
    let externalUsersIds = [];
    let condition = {};
    let externalUsersOrganisationsIds = [];

    let userCondition = {
        id: userId,
    };
    const searchCondition = { userCondition };
    //Get External Users List
    const users = await getExternalUsers(searchCondition);
    if (users && users.externalUsers && users.externalUsers.length > 0) {
        externalUsersIds = users.externalUsers.map((user) => user.id);
        allExternalUsers = users.externalUsers;
    } else {
        externalUsersIds = [];
    }

    const connections = await Connection.findAll({
        where: {
            [Op.or]: [
                { from: context.authUser.organisation[0].id },
                { to: context.authUser.organisation[0].id },
            ],
            model: 'Organisation',
        },
    });
    const organisations = connections.map((connection) => {
        if (connection.from !== context.authUser.organisation[0].id) {
            return connection.from;
        }
    });
    const userRole = await UserOrganisationRole.findOne({
        where: {
            user_id: userId,
            organisation_id: context.authUser.organisation[0].id,
        },
    });
    const roleId = userRole.role_id;
    if (roleId === 3) {
        externalUsersOrganisationsIds = users.externalUsers.map(
            (user) => user.organisation[0].id
        );

        condition = {
            id: { [Op.in]: externalUsersOrganisationsIds },
        };
    } else if (roleId === 1 || roleId === 2) {
        condition = {
            id: { [Op.in]: organisations },
        };
    }
    
    //Get external users from connected organisations
    const usersOfExternalOrganisation = await User.findAll({
        where: {
            id: { [Op.notIn]: externalUsersIds },
        },
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name', 'organisation_type'],
                where: condition,
            },
        ],
    });
    console.log("88888888888888888888888888888888888888888888888")
    console.log("usersOfExternalOrganisation: " + JSON.stringify(usersOfExternalOrganisation))
    if (usersOfExternalOrganisation && usersOfExternalOrganisation.length > 0) {
        allExternalUsers.push(...usersOfExternalOrganisation);
    }
    
    return allExternalUsers;
};

export const searchAllExternalUsers = async (context, searchCondition) => {
    let allExternalUsers = [];
    let externalUsersIds = [];
    let condition = {};
    let externalUsersOrganisationsIds = [];

    searchCondition.userCondition = {
        id: context.authUser.id,
    };
    //Get External Users List
    const users = await getExternalUsers(searchCondition);
    if (users && users.externalUsers && users.externalUsers.length > 0) {
        externalUsersIds = users.externalUsers.map((user) => user.id);
        allExternalUsers = users.externalUsers;
    } else {
        externalUsersIds = [];
    }

    const connections = await Connection.findAll({
        where: {
            [Op.or]: [
                { from: context.authUser.organisation[0].id },
                { to: context.authUser.organisation[0].id },
            ],
            model: 'Organisation',
        },
    });

    const organisations = connections.map((connection) => {
        if (connection.from !== context.authUser.organisation[0].id) {
            return connection.from;
        }
    });
    //if auth user role is Standard
    if (context.authUser.role[0].id === 3) {
        if (users && users.externalUsers) {
            externalUsersOrganisationsIds = users.externalUsers.map(
                (user) => user.organisation[0].id
            );

            condition = {
                id: { [Op.in]: externalUsersOrganisationsIds },
            };
        }
        else {
            organisations && organisations.map((organisation) => {
                if (organisation) {
                    externalUsersOrganisationsIds.push(organisation);
                }
            });

            condition = {
                id: { [Op.in]: externalUsersOrganisationsIds },
            }
        }
    } else if (
        //if auth user role is Admin or Owner
        context.authUser.role[0].id === 1 ||
        context.authUser.role[0].id === 2
    ) {
        condition = {
            id: { [Op.in]: organisations },
        };
    }

    //Get external users from connected organisations
    const usersOfExternalOrganisationCondition = {};
    if ('userSearchCondition' in searchCondition) {
        usersOfExternalOrganisationCondition[Op.or] = [
            ...searchCondition.userSearchCondition,
            searchCondition.organisationUserCondition,
            searchCondition.roleUserCondition,
        ];
    }
    else {
        if (!users || !users.externalUsers) {
            usersOfExternalOrganisationCondition[Op.or] = [
                searchCondition.externalUserCondition
            ]
        }
    }

    const usersOfExternalOrganisation = await User.findAll({
        where: {
            id: { [Op.notIn]: externalUsersIds },
            ...usersOfExternalOrganisationCondition,
        },
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
                where: condition,
            },
            {
                model: Image,
                as: 'image',
                attributes: ['id', 'thumbnail'],
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
            },
            {
                model: Country,
                as: 'country',
                attributes: ['id', 'name'],
            },
            {
                model: Hashtag,
                as: 'externalUserHashtags',
            },
        ],
    });

    if (usersOfExternalOrganisation && usersOfExternalOrganisation.length > 0) {
        allExternalUsers.push(...usersOfExternalOrganisation);
    }

    return allExternalUsers;
};

export const getAllInternalUsers = async (searchCondition) => {
    let search = {};
    if ('internalUserSearchCondition' in searchCondition) {
        search = {
            [Op.or]: [
                ...searchCondition.internalUserSearchCondition,
                searchCondition.internalUserRoleCondistion,
            ],
        };
    }
    const users = await User.findAll({
        attributes: [
            'id',
            'first_name',
            'last_name',
            'work_email',
            'last_accessed',
            'city',
        ],
        where: search,
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id'],
                where: searchCondition.organisationIdCondistion,
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
            },
        ],
    });
    return users;
};

export const getExternalOrganisations = async (searchCondition) => {
    let search = {};
    if ('organisationOwnerSearchCondition' in searchCondition) {
        search = {
            [Op.or]: [
                ...searchCondition.organisationOwnerSearchCondition,
                ...searchCondition.organisationSearchCondition,
            ],
        };
    }

    const organisation = await Organisation.findOne({
        include: [
            {
                model: Organisation,
                as: 'externalOrganisations',
                attributes: ['id', 'name', 'work_phone', 'created_at'],
                where: searchCondition.externalOrganisationCondition || '',
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
                        attributes: ['id', 'imagable_id', 'imagable_type', 'thumbnail'],
                    },
                ],
            },
        ],
        where: {
            ...searchCondition.organisationIdCondition,
            ...search,
        },
    });

    return organisation;
};

export const resendInviteToExternalOrganisation = async (
    organisation,
    context,
    connection
) => {
    let isResendInvitation = false;
    let token = generateRandomString(32);

    //send email
    await new Promise((resolve) => {
        EmailService.sendExternalOrganisationInvite(
            context.authUser.work_email,
            context.authUser.organisation[0].name,
            `${process.env.APP_URL}/accept/${token}`,
            organisation.user[0].work_email,
            (data, err) => {
                if (err) {
                    isResendInvitation = false;
                    resolve();
                } else {
                    connection.update({ token: token });
                    isResendInvitation = true;
                    resolve();
                }
            }
        );
    });

    return isResendInvitation;
};

export const getAllExternalOrganisationMembers = async (
    context,
    organisationCondition,
    userCondition,
    myOrganisationCondition,
    externalUserCondition
) => {
    const users = await User.findAll({
        where: userCondition,
        attributes: ['id', 'work_email'],
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
                where: myOrganisationCondition,
            },
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
                    'created_at',
                ],
                where: externalUserCondition,
                include: [
                    {
                        model: Organisation,
                        as: 'organisation',
                        attributes: ['id', 'name'],
                        where: organisationCondition,
                    },
                    {
                        model: Image,
                        as: 'image',
                        attributes: ['id', 'thumbnail'],
                    },
                ],
            },
        ],
    });

    return users;
};

export const getExternalOrganisationMembers = async (context, id) => {
    if (
        context.authUser.role[0].id === parseInt(process.env.OWNER_ROLE_ID) ||
        context.authUser.role[0].id === parseInt(process.env.ADMINISTRATOR_ROLE_ID)
    ) {
        let organisationCondition = { id: id };
        let myOrganisationCondition = { id: context.authUser.organisation[0].id };
        let allUsersExtexnalMembers = await getAllExternalOrganisationMembers(
            context,
            organisationCondition,
            {},
            myOrganisationCondition,
            {}
        );

        let organisationMembers = [];
        allUsersExtexnalMembers.map((user) => {
            organisationMembers.push(...user.externalUsers);
        });
        return organisationMembers;
    } else {
        let organisationCondition = { id: id };
        let userCondition = { id: context.authUser.id };
        const searchCondition = {
            userCondition,
            organisationCondition,
        };
        let members = await getExternalUsers(searchCondition);

        if (members && members.externalUsers) {
            return members.externalUsers;
        } else {
            return null;
        }
    }
};

export const getExternalOrganisationMember = async (context, id) => {
    if (
        context.authUser.role[0].id === parseInt(process.env.OWNER_ROLE_ID) ||
        context.authUser.role[0].id === parseInt(process.env.ADMINISTRATOR_ROLE_ID)
    ) {
        let organisationCondition = {};
        let externalUserCondition = { id: id };
        let myOrganisationCondition = { id: context.authUser.organisation[0].id };
        let extexnalMember = await getAllExternalOrganisationMembers(
            context,
            organisationCondition,
            {},
            myOrganisationCondition,
            externalUserCondition
        );

        if (
            extexnalMember &&
            extexnalMember[0] &&
            extexnalMember[0].externalUsers &&
            extexnalMember[0].externalUsers[0]
        ) {
            return extexnalMember[0].externalUsers[0];
        } else {
            return null;
        }
    } else {
        let externalUserCondition = { id: id };
        let userCondition = { id: context.authUser.id };
        const searchCondition = {
            externalUserCondition,
            userCondition,
        };
        let member = await getExternalUsers(searchCondition);

        if (member && member.externalUsers && member.externalUsers[0]) {
            return member.externalUsers[0];
        } else {
            return null;
        }
    }
};
