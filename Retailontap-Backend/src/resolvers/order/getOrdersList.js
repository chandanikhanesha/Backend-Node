import * as OrderService from '../../utils/service/OrderService';
import * as ReportDashboard from '../../utils/service/ReportDashboard';
import { Op } from 'sequelize';

export default {
  Query: {
    orders: async (parent, args, context) => {
      const type = context.authUser.organisation[0].organisation_type;
      const condition = {
        hashtag: {},
        createdAt: {},
        aliasUser: '',
        quotation: {},
        order: {},
      };
      const ids = await ReportDashboard.getIdsByRoleTeamAdminAndOwnerSame({
        context,
      });

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
      try {
        return OrderService.getOrders({
          condition,
        });
      } catch (e) {}
    },
  },
};
