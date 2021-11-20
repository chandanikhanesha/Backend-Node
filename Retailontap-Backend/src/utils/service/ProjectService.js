const { Op } = require('sequelize');
import {
  Conversation,  
  Hashtag,
  Image,
  Organisation,
  Project,
  User,
  ProjectSupplier,
  ProjectStatus
} from '../../../models';
import { generateRandomString } from '../functions';
import * as OrganisationService from './OrganisationService';
import { deleteAssociations } from './BaseService';

export const associateInternalUsers = async (
  context,
  internalUsers,
  projectConversation
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

  if (projectConversation.supplier_id) {
    conversationParticipant.push(projectConversation.supplier_id);
  }
  const addParticipants = await projectConversation.setParticipants(
    conversationParticipant
  );

  if (addParticipants) {
    return true;
  } else {
    return false;
  }
};

export const associateExternalUsers = async (
  context,
  project,
  externalUsers,
  internalUsers,
  action
) => {
  const sentExternalUserIds = [];
  const conversations = await Conversation.findAll({
    where: { project_id: project.id },
  });
  const emptyConversation = await Conversation.findOne({
    where: { project_id: project.id, supplier_id: null },
  });
  const conversationsSupplierIds = conversations.map(
    ({ supplier_id }) => supplier_id
  );
  const externalUsersList = await OrganisationService.getAllExternalUsers(
    context
  );
  let externalUsersIds = [];
  externalUsersList.map((externalUser) => {
    externalUsersIds.push(externalUser.id);
  });

  let newProjectConversations = [];
  let updateProjectConversations = [];
  let newExternalUsers = [];
  
  externalUsers.map((user, index) => {
    if (
      externalUsersIds.includes(user.id) &&
      !conversationsSupplierIds.includes(user.id)
    ) {
      sentExternalUserIds.push(user.id);
      if (emptyConversation && index === 0) {
        emptyConversation.name = user.first_name + ' ' + user.last_name;
        emptyConversation.supplier_id = user.id;
        emptyConversation.save();
        updateProjectConversations.push(emptyConversation);
      } else {
        newProjectConversations.push(
          blankProjectConversation({
            context,
            projectId: project.id,
            user,
            productId: project.product_id,
          })
        );

        newExternalUsers.push({ project_id: project.id, supplier_id: user.id, status_id: 1 });
      }
    } else if (externalUsersIds.includes(user.id)) {
      sentExternalUserIds.push(user.id);
      const findExternalUser = conversations.find(
        ({ supplier_id }) => supplier_id === user.id
        );

      if (action === "convert") {
        newExternalUsers.push({ project_id: project.id, supplier_id: user.id, status_id: 2 });
      }

      updateProjectConversations.push(findExternalUser);
    }
  });

  if (!sentExternalUserIds.length) {
    if (emptyConversation) {
      updateProjectConversations.push(emptyConversation);
    } else {
      newProjectConversations.push(
        blankProjectConversation({
          context,
          projectId: project.id,
          user: null,
          productId: project.product_id,
        })
      );
    }
  }
  const projectConversations = await Conversation.bulkCreate(
    newProjectConversations
  );
  updateProjectConversations.map(async (projectConversation) => {
    await associateInternalUsers(context, internalUsers, projectConversation);
  });
  projectConversations.map(async (projectConversation) => {
    await associateInternalUsers(context, internalUsers, projectConversation);
  });

  if (newExternalUsers && newExternalUsers.length > 0) {
    await ProjectSupplier.bulkCreate(
        newExternalUsers
    );
  }

  if (action === 'update') {
    const supplierId = {};
    if (sentExternalUserIds.length) {
      supplierId[Op.notIn] = sentExternalUserIds;
    } else {
      supplierId[Op.ne] = null;
    }
    const condition = {
      where: {
        project_id: project.id,
        supplier_id: supplierId,
      },
    };
    await deleteAssociations(Conversation, condition);
    await deleteAssociations(ProjectSupplier, condition);
  }
};

export const blankProjectConversation = ({
  context,
  projectId,
  user,
  productId,
}) => {
  return {
    name: user && user.first_name + ' ' + user.last_name,
    description: '',
    channel_id: generateRandomString(20),
    network: 'external',
    method: 'project conversation',
    created_by: context.authUser.id,
    supplier_id: user && user.id,
    product_id: productId || null,
    project_id: projectId,
  };
};

export const getProjects = async ({ condition }) => {
    const project = await Project.findAll({
    where: condition.projectCondition,
    include: [
      {
        model:ProjectSupplier,
        as:'projectsuppliers',
        required: condition.required,
        where: condition.supplierCondition || {},
        order: [['updated_at', 'DESC']],
        include: [
          {
            model: ProjectStatus,
            as: 'projectstatus',
            attributes: ['id', 'name'],
          },
          {
            model: User,
            as: 'supplier',
            attributes: ['id', 'first_name', 'last_name'],               
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
              },
            ],
          }
        ]
      },
      {
        model: Conversation,
        as: 'conversations',
        required: condition.required,
        where: condition.conversationCondition,
        include: [
          {
            model: User,
            as: 'participants',
          },
        ],
      },
      {
        model: Hashtag,
        as: 'hashtags',
      },
      {
        model: Image,
        as: 'images',
      },
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'first_name', 'last_name'],
        include: [
          {
            model: Organisation,
            as: 'organisation',
            attributes: ['id', 'name'],
          },
        ],
      },
    ],
  });
  return project;
};


export const getDashboardProjects = async ({ projectIds, supplierIds }) => {
    if (projectIds.length && supplierIds.length) {     
        const project = await Project.findAll({
        where: {
          id: {
            [Op.in]: projectIds,
          },
        },
        include: [
          {
            model:ProjectSupplier,
            as:'projectsuppliers',
            required: true,
            where: {
              supplier_id: {
                [Op.in]: supplierIds,
              },
            },
            order: [['updated_at', 'DESC']],
            include: [
              {
                model: ProjectStatus,
                as: 'projectstatus',
                attributes: ['id', 'name'],
              },
              {
                model: User,
                as: 'supplier',
                attributes: ['id', 'first_name', 'last_name'],               
                include: [
                  {
                    model: Organisation,
                    as: 'organisation',
                    attributes: ['id', 'name'],
                  },
                ],
              }
            ]
          },
          {
            model: Hashtag,
            as: 'hashtags',
          },
          {
            model: Image,
            as: 'images',
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'first_name', 'last_name'],
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
              },
            ],
          },
        ],
      });


      let projectList = [];
      let id;
      let project_name;
      let start_date;
      let end_date;
      let budget;
      let creator_id;
      let creator_name;
      let creator_organisation_name;
      let supplier_id;
      let supplier_name;
      let supplier_organisation_name;
      let project_status;
               
      if (project && project.length) {
        project.map((item, index) => {
              
          id = item.id;
          project_name = item.name;
          start_date = item.start_date;
          end_date = item.end_date;
          budget = item.budget;
          creator_id = item.creator ? item.creator.id : 0;
          creator_name = item.creator ? item.creator.first_name + ' ' + item.creator.last_name : '';
          creator_organisation_name = item.creator && item.creator.organisation && item.creator.organisation.length > 0 ? item.creator.organisation[0].name : '';

          item.projectsuppliers && item.projectsuppliers.map((x, index) => {
            supplier_id = x.supplier_id;
            supplier_name = x.supplier ? x.supplier.first_name + ' ' + x.supplier.last_name : '';
            supplier_organisation_name = x.supplier && x.supplier.organisation && x.supplier.organisation.length > 0 ? x.supplier.organisation[0].name : '' ;
            project_status = x.projectstatus && x.status_id > 2 ? x.projectstatus.name : '';

            projectList.push({
              id,
              name: project_name,
              start_date,
              end_date,
              budget,
              status: project_status,
              creator_id,
              creator_name,
              creator_organisation_name,
              supplier_id,
              supplier_name,
              supplier_organisation_name
            });
          });
        });
      }

      return projectList;
    } else {
        return [];
    }    
};