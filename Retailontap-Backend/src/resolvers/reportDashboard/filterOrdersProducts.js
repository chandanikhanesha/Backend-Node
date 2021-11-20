import { response, validateForm } from '../../utils/functions';
import * as OrderService from '../../utils/service/OrderService';
import * as ReportDashboard from '../../utils/service/ReportDashboard';
import { Op } from 'sequelize';

export default {
  Mutation: {
    filterOrdersProducts: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        supplierOrRetailerId: 'integer',
        hashtagId: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('filter-order', 'Validation failed!', 422, errors);
      }

      try {
        const type = context.authUser.organisation[0].organisation_type;
        const condition = {
          quotation: {},
          aliasUser: '',
          hashtag: {},
        };
        const ids = await ReportDashboard.getIdsByRole({ context });
        if (type === 'retailer') {
          condition.aliasUser = 'supplier';
          condition.quotation = {
            retailer_id: {
              [Op.in]: ids,
            },
          };
        } else {
          condition.aliasUser = 'retailer';
          condition.quotation = {
            supplier_id: {
              [Op.in]: ids,
            },
          };
        }

        if (args.hashtagId) {
          condition['hashtag'] = {
            id: args.hashtagId,
          };
        } else if (args.supplierOrRetailerId) {
          condition.quotation[`${condition.aliasUser}_id`] =
            args.supplierOrRetailerId;
        }

        const orders = await OrderService.getOrders({
          condition,
        });

        return {
          ordersProductsGroup: orders,
          openOrdersProductsGroup: orders,
        };
      } catch (e) {}
    },
  },
};
