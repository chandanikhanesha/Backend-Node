import * as moment from 'moment';
import { sequelize } from '../variables';
import { Op } from 'sequelize';
import {
    Conversation,
    Message,
    Organisation,
    Role,
    User,
    UserOrganisationRole,
    UserTeamRole,
} from '../../../models';
import * as OrderService from './OrderService';
import * as SampleService from './SampleService';
import * as ProjectService from './ProjectService';

export const OrderAndQuantityCompare = async ({ condition, allDate }) => {
    const orderAndQuantityCompare = await sequelize.query(`
        SELECT sum("q-i".quantity) AS quantity, count(o.id) AS order,
        to_timestamp(cast(o.created_at as TEXT), 'yy.mm' ) as date
        from orders AS o
        ${condition.hashtagSQL}
        JOIN "quotation-items" "q-i" ON "q-i".id = o.quotation_item_id
        JOIN quotations q ON q.id = "q-i".quotation_id AND ${condition.quotationSQL}
        where (o.created_at >= '${allDate.currentYearStart}' AND o.created_at <= '${allDate.currentYearEnd}')
        OR (o.created_at >= '${allDate.lastYearStart}' AND o.created_at <= '${allDate.lastYearEnd}')
        GROUP BY date
  `);

    return orderAndQuantityCompare[0];
};

export const OrderBeDelivered = async ({ condition, allDate }) => {
    const orderBeDelivered = await sequelize.query(`
        SELECT sum("q-i".quantity) as quantity, count(o.id) as order,
        to_timestamp(cast(o.delivery_date as TEXT), 'yy.mm' ) as date
        from orders as o 
        ${condition.hashtagSQL}
        JOIN "quotation-items" "q-i" on "q-i".id = o.quotation_item_id
        JOIN quotations q on q.id = "q-i".quotation_id AND ${condition.quotationSQL}
        WHERE o.delivery_date >= '${allDate.currentYearStart}' AND o.delivery_date <= '${allDate.toSixMonthEnd}'
        GROUP BY date
  `);

    return orderBeDelivered[0];
};

export const CircleSupplierByOrderAndByQuantity = async ({ condition }) => {
    const circleSupplierByOrderAndByQuantity = await sequelize.query(
        ` SELECT o2.name, count(q.${condition.groupByUser}) AS order,  sum(qi.quantity) AS quantity
      from orders AS o
      ${condition.hashtagSQL}
      JOIN "quotation-items" qi ON qi.id = o.quotation_item_id
      JOIN quotations q ON q.id = qi.quotation_id AND ${condition.quotationSQL}
      JOIN users u ON u.id = q.supplier_id
      JOIN user_organisation_roles uor ON u.id = uor.user_id
      JOIN organisations o2 ON uor.organisation_id = o2.id
      ${condition.createdAtSQL}
      GROUP BY q.${condition.groupByUser}, o2.name`
    );

    return circleSupplierByOrderAndByQuantity[0];
};

export const SupplierByOrderAndByQuantity = async ({ condition }) => {
    const supplierByOrderAndByQuantity = await sequelize.query(
        ` SELECT o2.name, count(q.${condition.groupByUser}) AS order, sum(qi.quantity) AS quantity
      from orders AS o
      JOIN "quotation-items" qi ON qi.id = o.quotation_item_id
      JOIN quotations q ON q.id = qi.quotation_id AND ${condition.quotationSQL}
      JOIN users u ON u.id = q.supplier_id
      JOIN user_organisation_roles uor ON u.id = uor.user_id
      JOIN organisations o2 ON uor.organisation_id = o2.id
      GROUP BY q.${condition.groupByUser}, o2.name`
    );
    return supplierByOrderAndByQuantity[0];
};

export const CountryByOrderAndByQuantity = async ({ condition }) => {
    const countryByOrderAndByQuantity = await sequelize.query(
        ` SELECT c.name, count(q.${condition.groupByUser}) AS order, sum(qi.quantity) AS quantity
      from orders AS o
      JOIN "quotation-items" qi ON qi.id = o.quotation_item_id
      JOIN quotations q ON q.id = qi.quotation_id AND ${condition.quotationSQL}
      JOIN users u ON u.id = q.supplier_id
      JOIN user_organisation_roles uor ON u.id = uor.user_id
      JOIN organisations o2 ON uor.organisation_id = o2.id
      JOIN countries c on o2.country_id = c.id
      GROUP BY q.${condition.groupByUser}, c.name`
    );
    return countryByOrderAndByQuantity[0];
};

export const OrdersProductsGroup = async ({ condition }) => {
    const ordersProductsGroupCounts = await sequelize.query(
        ` 
        SELECT count(o.id) AS total_order,
        sum("q-i".quantity) AS total_quantity,
        sum(pi.unit_price) AS total_price
        from orders AS o
        ${condition.hashtagSQL}
        JOIN "quotation-items" "q-i" on "q-i".id = o.quotation_item_id
        JOIN quotations q ON q.id = "q-i".quotation_id AND ${condition.quotationSQL}
        JOIN product_items pi on pi.id = "q-i".product_item_id 
        ${condition.createdAtSQL}
        `
    );

    return ordersProductsGroupCounts[0][0] ? ordersProductsGroupCounts[0][0] : {};
};
export const GetProjectNetworkCount = async ({
    user_id,
    projects,
    organisation_id,
    userType,
}) => {
    const { userIds, supplierIds, projectIds, conversationIds } = projects.reduce(
        (result, item) => {
            item.conversations.map((conversation) => {
                result.conversationIds.push(conversation.id);
                if (!result.supplierIds.includes(conversation.supplier_id)) {
                    result.supplierIds.push(conversation.supplier_id);
                }
                if (!result.projectIds.includes(conversation.project_id)) {
                    result.projectIds.push(conversation.project_id);
                }
                conversation.participants.map((participant) => {
                    if (!result.userIds.includes(participant.id) && participant.id !== user_id) {
                        result.userIds.push(participant.id);
                    }
                });
            });
            return result;
        },
        {
            userIds: [],
            supplierIds: [],
            projectIds: [],
            conversationIds: [],
        }
    );
    const result = [];

    if (userIds.length || conversationIds.length) {
        let activeUserIds = [];

        const projectActiveUsers = await GetprojectsActiveUsers({
            conversationIds,
            userIds,
        });

        if (projectActiveUsers.length) {
            activeUserIds = projectActiveUsers.map((user) => user.sender_id);

            const internalUsersLength = await GetprojectsInternalUsers({
                activeUserIds,
                organisation_id,
            });

            result.push(
                {
                    count: internalUsersLength,
                    network: 'internal',
                },
                {
                    count: activeUserIds.length - internalUsersLength,
                    network: 'external',
                }
            );

        } else {
            activeUserIds = [];
            result.push(
                {
                    count: '0',
                    network: 'internal',
                },
                {
                    count: '0',
                    network: 'external',
                }
            );
        }

        if (supplierIds.length && projectIds.length) {
            const activeProjects = await GetActiveProjects({
                conversationIds,
                userIds: supplierIds,
            });

            if (activeProjects.length) {
                let flags = [];
                let activeProjectIds = [];
                let i;

                for (i = 0; i < activeProjects.length; i++) {
                    if (flags[activeProjects[i].project_id]) continue;
                    flags[activeProjects[i].project_id] = true;
                    activeProjectIds.push(activeProjects[i].project_id);
                }

                const inactive = projectIds.length - activeProjects.length;

                result.unshift({
                    count: activeProjects.length,
                    network: 'active',
                });
                result.push({
                    count: inactive,
                    network: 'inactive',
                });
            }
            else {
                result.unshift({
                    count: '0',
                    network: 'active',
                });
                result.push({
                    count: projectIds.length,
                    network: 'inactive',
                });
            }
        }
    }


    return result;
};

export const ProjectNegotiationsStatus = async ({
    condition,
    ordersLength,
}) => {
    const sample = await sequelize.query(
        `
        SELECT  count(s.is_submited) as requested, (SELECT  count(s.is_submited)
        FROM samples AS s
        WHERE ${condition.sampleSQL} and is_submited = true) as received
        FROM samples AS s
        WHERE ${condition.sampleSQL}
      `
    );
    const quotation = await sequelize.query(
        `
        SELECT  count(q.is_submited) as requested, (SELECT  count(q.is_submited)
        FROM quotations AS q
        WHERE ${condition.quotationSQL} and is_submited = true) as received
        FROM quotations AS q
        WHERE ${condition.quotationSQL}
      `
    );

    return {
        sample: sample[0][0] || {},
        quotation: quotation[0][0] || {},
        order: { placed: `${ordersLength}` },
    };
};

export const ShowRoomAllCountInfo = async ({ ids }) => {
    const showRoomCountInfo = await sequelize.query(
        `
      SELECT sum(p.views) AS views, sum(p.requested) AS requested, sum(p.converted) AS converted 
      FROM products AS p 
      WHERE p.user_id IN (${ids.join(',')})
      `
    );
    return showRoomCountInfo[0] && showRoomCountInfo[0][0];
};
export const ShowRoomProducts = async ({ ids, filterCondition = '', filterByDate, filterByHashtag }) => {
    console.log("********** ShowRoomProducts ********** : " + ids.join(','));
    console.log("********** filterByDate ********** : " + filterByDate);
    console.log("********** filterByHashtag ********** : " + filterByHashtag);
    let showRoomProducts = null;
    let whereClause = `p.user_id IN (${ids.join(',')})`;

    console.log("********** here **********");

    if (filterByDate !== undefined && filterByHashtag !== undefined) {
        if (filterByDate !== '' && filterByHashtag !== '')
            whereClause = whereClause + ` AND TO_CHAR(p.created_at, 'YYYY-MM-DD') = '${filterByDate}' AND h.name = '${filterByHashtag}'`;
        else if (filterByDate !== '' && filterByHashtag === '')
            whereClause = whereClause + ` AND TO_CHAR(p.created_at, 'YYYY-MM-DD') = '${filterByDate}'`;
        else if (filterByDate === '' && filterByHashtag !== '')
            whereClause = whereClause + ` AND h.name = '${filterByHashtag}'`;
    }

    console.log("********** whereClause **********");
    console.log(whereClause);
    console.log("********** whereClause **********");

    showRoomProducts = await sequelize.query(
        `
          SELECT p.id as id, p.views, p.requested, p.created_at, img.thumbnail,img.id as imgId, count(o.id) AS orders_generated
          FROM products as p
          LEFT JOIN images as img ON img.imagable_id = p.id AND img.imagable_type = 'Product'
          LEFT JOIN projects p2 on p.id = p2.product_id
          LEFT JOIN  orders o on p2.id = o.project_id
          LEFT JOIN hashtagables AS ht ON ht.hashtagable_id = p.id AND ht.hashtagable_type = 'Product'
          LEFT JOIN hashtags AS h ON h.id = ht.hashtag_id
          WHERE (${whereClause})
          GROUP BY p.id, img.id
          ${filterCondition}`
    );

    return showRoomProducts[0];
};

export const date = () => {
    const currentYearStart = moment()
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss');
    const currentYearEnd = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');

    const lastYearStart = moment()
        .subtract(1, 'years')
        .startOf('month')
        .format('YYYY-MM-DD HH:mm:ss');
    const lastYearEnd = moment()
        .subtract(1, 'years')
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss');

    const toSixMonthEnd = moment()
        .add(6, 'months')
        .endOf('month')
        .format('YYYY-MM-DD HH:mm:ss');

    return {
        currentYearStart,
        currentYearEnd,
        lastYearStart,
        lastYearEnd,
        toSixMonthEnd,
    };
};

export const getIdsByRole = async ({ context }) => {
    const role = context.authUser.role[0].id;
    let ids = [];
    if (role === 1) {
        const userIds = await UserOrganisationRole.findAll({
            attributes: ['user_id'],
            where: {
                organisation_id: context.authUser.organisation[0].id,
            },
        }).map(({ user_id }) => user_id);
        ids = userIds;
    } else {
        const teamIds = await UserTeamRole.findAll({
            attributes: ['team_id'],
            where: {
                user_id: context.authUser.id,
                role_id: 1,
            },
        }).map(({ team_id }) => team_id);
        if (teamIds.length) {
            const userIds = await UserTeamRole.findAll({
                attributes: ['user_id'],
                where: {
                    team_id: {
                        [Op.in]: teamIds,
                    },
                },
            }).map(({ user_id }) => user_id);
            ids = userIds;
        } else {
            ids.push(context.authUser.id);
        }
    }
    return ids;
};

export const getIdsByRoleTeamAdminAndOwnerSame = async ({ context }) => {
    const role = context.authUser.role[0].id;
    let ids = [];
    if (role === 1 || role === 2) {
        const userIds = await UserOrganisationRole.findAll({
            attributes: ['user_id'],
            where: {
                organisation_id: context.authUser.organisation[0].id,
            },
        }).map(({ user_id }) => user_id);
        ids = userIds;
    } else {
        ids.push(context.authUser.id);
    }
    return ids;
};

export const GetprojectsInternalUsers = async ({
    userIds,
    organisation_id,
}) => {
    const users = await User.findAll({
        where: {
            id: {
                [Op.in]: userIds,
            },
        },
        include: [
            {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name', 'deleted_at'],
                paranoid: false,
                where: {
                    id: organisation_id,
                },
            },
            {
                model: Role,
                as: 'role',
                attributes: ['id', 'name'],
            },
        ],
    });
    return users.length;
};

export const GetprojectsActiveUsers = async ({ userIds, conversationIds }) => {
    const inactiveUsers = await Message.findAll({
        where: {
            sender_id: {
                [Op.in]: userIds,
            },
            conversation_id: {
                [Op.in]: conversationIds,
            },
        },
    });
    return inactiveUsers.length;
};

export const GetActiveProjects = async ({ userIds, conversationIds }) => {
    const activeProjects = await Conversation.findAll({
        where: {
            id: {
                [Op.in]: conversationIds,
            },
        },
        include: [
            {
                model: Message,
                as: 'messages',
                required: true,
                where: {
                    sender_id: {
                        [Op.in]: userIds,
                    },
                },
            }
        ]
    });
    return activeProjects;
};

export const GetLastFiveProjectConversation = async ({ ids }) => {
    const conversations = await Message.findAll({
        limit: 5,
        attributes: ['conversation_id'],
        where: {
            sender_id: {
                [Op.in]: ids,
            },
        },
        order: [['created_at', 'DESC']],
    });
    return conversations;
};

export const retailerReport = async ({ condition, context, ids }) => {
    const allDate = await date();
    const orders = await OrderService.getOrders({ condition });
    const countryByOrderAndByQuantity = await CountryByOrderAndByQuantity({
        condition,
    });
    const supplierByOrderAndByQuantity = await SupplierByOrderAndByQuantity({
        condition,
    });
    const circleSupplierByOrderAndByQuantity = await CircleSupplierByOrderAndByQuantity(
        { condition }
    );
    const orderAndQuantityCompare = await OrderAndQuantityCompare({
        condition,
        allDate,
    });
    const orderBeDelivered = await OrderBeDelivered({
        condition,
        allDate,
    });
    // products group
    const ordersProductsGroupCounts = await OrdersProductsGroup({
        condition,
    });

    const productsGroup = {
        ordersProductsGroupCounts,
        ordersProductsGroup: orders,
        openOrdersProductsGroup: orders,
    };

    // sample
    const samples = await SampleService.getSamples({ condition });

    // projects

    const projectNegotiationsStatus = await ProjectNegotiationsStatus({
        condition,
        ordersLength: orders.length,
    });
    const conditionGetProjects = {
        projectCondition: {
            organisation_id: context.authUser.organisation[0].id,
            created_by: {
                [Op.in]: ids,
            },
        },
        required: false,
    };

    const getProjects = await ProjectService.getProjects({
        condition: conditionGetProjects,
    });
    const projectNetworkCount = await GetProjectNetworkCount({
        user_id: context.authUser.id,
        projects: getProjects,
        organisation_id: context.authUser.organisation[0].id,
        userType: true,
    });

    const conversations = await GetLastFiveProjectConversation({ ids });

    let projectIds = [];
    let supplierIds = [];

    if (conversations && conversations.length) {
        projectIds = conversations.map((conversation) => conversation.project_id);
        supplierIds = conversations.map((conversation) => conversation.supplier_id);
    }

    const getDashboardProjects = await ProjectService.getDashboardProjects({
        projectIds,
        supplierIds
    });

    const project = {
        projectNetworkCount,
        projectNegotiationsStatus,
        projects: getDashboardProjects,
    };
    return {
        orders,
        orderAndQuantityCompare,
        orderBeDelivered,
        circleSupplierByOrderAndByQuantity,
        supplierByOrderAndByQuantity,
        countryByOrderAndByQuantity,
        productsGroup,
        samples,
        project,
    };
};

export const supplierReport = async ({ condition, context, ids }) => {
    const allDate = await date();
    const orders = await OrderService.getOrders({ condition });

    const circleSupplierByOrderAndByQuantity = await CircleSupplierByOrderAndByQuantity(
        { condition }
    );
    const orderAndQuantityCompare = await OrderAndQuantityCompare({
        condition,
        allDate,
    });
    const orderBeDelivered = await OrderBeDelivered({
        condition,
        allDate,
    });
    // show room
    const products = await ShowRoomProducts({ ids });
    const showRoomCountInfo = await ShowRoomAllCountInfo({ ids });
    const showRoom = {
        showRoomCountInfo: {
            ...showRoomCountInfo,
            total_items: `${products.length}`,
        },
        products,
    };
    // sample
    const samples = await SampleService.getSamples({ condition });

    // projects

    const projectNegotiationsStatus = await ProjectNegotiationsStatus({
        condition,
        ordersLength: orders.length,
    });

    const conditionGetProjects = {
        conversationCondition: {
            method: 'project conversation',
            supplier_id: {
                [Op.in]: ids,
            },
        },
        supplierCondition: {
            supplier_id: {
                [Op.in]: ids,
            }
        },
        required: true,
    };

    const getProjects = await ProjectService.getProjects({
        condition: conditionGetProjects,
    });

    const conversations = await GetLastFiveProjectConversation({ ids });

    let projectIds = [];
    let supplierIds = [];

    if (conversations && conversations.length) {
        projectIds = conversations.map((conversation) => conversation.project_id);
        supplierIds = conversations.map((conversation) => conversation.supplier_id);
    }

    const getDashboardProjects = await ProjectService.getDashboardProjects({
        projectIds,
        supplierIds
    });
    const projectNetworkCount = await GetProjectNetworkCount({
        user_id: context.authUser.id,
        projects: getProjects,
        organisation_id: context.authUser.organisation[0].id,
    });
    const project = {
        projectNetworkCount,
        projectNegotiationsStatus,
        projects: getDashboardProjects,
    };
    return {
        orders,
        orderAndQuantityCompare,
        orderBeDelivered,
        circleSupplierByOrderAndByQuantity,
        showRoom,
        samples,
        project,
    };
};
