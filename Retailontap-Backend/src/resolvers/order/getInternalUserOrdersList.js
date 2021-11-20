import * as OrderService from '../../utils/service/OrderService';
import * as OrganisationService from '../../utils/service/OrganisationService';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    getInternalUserOrders: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        userId: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'get-internal-user-order',
          'Validation failed!',
          422,
          errors
        );
      }
      const type = context.authUser.organisation[0].organisation_type;
      const orderCondition = {
        hashtag: {},
        createdAt: {},
        aliasUser: '',
        quotation: {},
        order: {},
      };
      const organisationIdCondistion = {
        id: context.authUser.organisation[0].id,
      };
      const searchCondition = {
        organisationIdCondistion,
      };
      let internalUser = null;
      const allInternalUsers = await OrganisationService.getAllInternalUsers(
        searchCondition
      );
      allInternalUsers.map((user) => {
        if (user.id === args.userId) {
          internalUser = true;
        }
      });
      if (internalUser) {
        if (type === 'retailer') {
          orderCondition.aliasUser = 'supplier';
          orderCondition.quotation = {
            retailer_id: args.userId,
          };
          try {
            const orders = await OrderService.getOrders({
              condition: orderCondition,
            });
            return {
              path: 'get-internal-user-order',
              message: 'Internal user order successfully get!',
              code: 200,
              errors: '',
              orders,
            };
          } catch (e) {
            return {
              path: 'get-internal-user-order',
              message: 'Get Internal user order failed!',
              code: 400,
              errors: '',
              orders: null,
            };
          }
        }
      } else {
        return {
          path: 'get-internal-user-order',
          message: 'Get Internal user order failed!',
          code: 400,
          errors: 'There is not internal user',
          orders: null,
        };
      }
    },
  },
};
