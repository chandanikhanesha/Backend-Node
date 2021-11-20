import { response, validateForm } from '../../utils/functions';
import { Group } from '../../../models';
import * as OrganisationService from '../../utils/service/OrganisationService';

export default {
  Mutation: {
    assignUsersToGroup: async (parent, args, context) => {
      let errors = null;

      args.users = JSON.parse(JSON.stringify(args.users));
      const validationRule = {
        id: 'required|integer',
        users: 'required',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'assign-users-to-group',
          'Validation failed!',
          422,
          errors
        );
      }

      const group = await Group.findOne({
        where: {
          id: args.id,
          organisation_id: context.authUser.organisation[0].id,
        },
      });

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

      const externalUsersList = await OrganisationService.getAllExternalUsers(
        context
      );

      let externalUsersIds = [];

      externalUsersList.map((externalUser) => {
        externalUsersIds.push(externalUser.id);
      });

      let usersList = [];
      args.users.map((user) => {
        if (group.group_type === 'internal') {
          if (internalUsersIds.includes(user.id)) {
            usersList.push(user.id);
          }
        } else if (group.group_type === 'external') {
          if (externalUsersIds.includes(user.id)) {
            usersList.push(user.id);
          }
        }
      });

      await group.addUser(usersList);

      return response(
        'assign-users-to-group',
        'Users successfully assigned to group',
        200,
        null
      );
    },
  },
};
