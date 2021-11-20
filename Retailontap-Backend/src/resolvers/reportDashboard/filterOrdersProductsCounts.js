import { response, validateForm } from '../../utils/functions';
import * as ReportDashboard from '../../utils/service/ReportDashboard';

export default {
  Mutation: {
    filterOrdersProductsCounts: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        supplierOrRetailerId: 'integer',
        hashtagId: 'integer',
        date_start: 'string',
        date_end: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('filter-order', 'Validation failed!', 422, errors);
      }

      try {
        const type = context.authUser.organisation[0].organisation_type;
        const condition = {
          createdAtSQL: '',
          quotationSQL: '',
          groupByUser: '',
          hashtagSQL: '',
        };
        const ids = await ReportDashboard.getIdsByRole({ context });

        if (type === 'retailer') {
          condition.aliasUser = 'supplier';
          condition.groupByUser = 'supplier_id';
          condition.quotationSQL = `q.retailer_id IN (${ids.join(',')})`;
        } else {
          condition.aliasUser = 'retailer';
          condition.groupByUser = 'retailer_id';
          condition.quotationSQL = `q.supplier_id IN (${ids.join(',')})`;
        }
        if (args.hashtagId) {
          condition.hashtagSQL = `
                              JOIN projects p on p.id = o.project_id
                              JOIN products p2 on p2.id = p.product_id
                              JOIN hashtagables h on h.hashtagable_id = p2.id 
                              AND  h.hashtag_id = ${args.hashtagId} 
                              AND h.hashtagable_type = 'Product'
                            `;
        } else if (args.supplierOrRetailerId) {
          condition.quotationSQL = `${condition.quotationSQL} AND q.${condition.groupByUser} = ${args.supplierOrRetailerId}`;
        } else if (args.date_end && args.date_start) {
          condition.createdAtSQL = `
            WHERE (o.created_at >= '${args.date_start}' AND o.created_at <= '${args.date_end}')
          `;
        } else if (args.date_start) {
          condition.createdAtSQL = `WHERE to_char(o.created_at, 'YYYY-MM-DD') = '${args.date_start}'`;
        }
        const ordersProductsGroupCounts = await ReportDashboard.OrdersProductsGroup(
          {
            condition,
          }
        );

        return ordersProductsGroupCounts;
      } catch (e) {}
    },
  },
};
