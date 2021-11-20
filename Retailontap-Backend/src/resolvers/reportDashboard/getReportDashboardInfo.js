import { Op } from 'sequelize';
import * as ReportDashboard from '../../utils/service/ReportDashboard';

export default {
  Query: {
    reportDashboardInfo: async (parent, args, context) => {
      try {
        const type = context.authUser.organisation[0].organisation_type;
        const condition = {
          hashtag: {},
          createdAt: {},
          createdAtSQL: '',
          deliveryDateSQL: '',
          quotation: {},
          quotationSQL: '',
          groupByUser: '',
          hashtagSQL: '',
          aliasUser: '',
          sample: {},
          sampleSQL: '',
        };
        const ids = await ReportDashboard.getIdsByRole({ context });
        if (type === 'retailer') {
          condition.aliasUser = 'supplier';
          condition.groupByUser = 'supplier_id';
          condition.quotationSQL = `q.retailer_id IN (${ids.join(',')})`;
          condition.sampleSQL = `s.retailer_id IN (${ids.join(',')})`;
          condition.quotation = {
            retailer_id: {
              [Op.in]: ids,
            },
          };
          condition.sample = {
            retailer_id: {
              [Op.in]: ids,
            },
          };
        } else {
          condition.aliasUser = 'retailer';
          condition.groupByUser = 'retailer_id';
          condition.quotationSQL = `q.supplier_id = ${ids.join(',')}`;
          condition.sampleSQL = `s.supplier_id IN (${ids.join(',')})`;
          condition.quotation = {
            supplier_id: {
              [Op.in]: ids,
            },
          };
          condition.sample = {
            supplier_id: {
              [Op.in]: ids,
            },
          };
        }

        if (type === 'retailer') {
          return await ReportDashboard.retailerReport({
            condition,
            context,
            ids,
          });
        } else {
          return await ReportDashboard.supplierReport({
            condition,
            context,
            ids,
          });
        }
      } catch (e) {}
    },
  },
};
