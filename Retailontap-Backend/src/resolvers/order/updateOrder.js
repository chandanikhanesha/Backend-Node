import { response, validateForm } from '../../utils/functions';
import { Order, Project, ProjectSupplier, Quotation, QuotationItems } from '../../../models';

export default {
  Mutation: {
    updateOrder: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        delivery_date: 'required|string',
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('update-order', 'Validation failed!', 422, errors);
      }
      try {
        const order = await Order.update(
          {
            delivery_date: args.delivery_date,
          },
          {
            where: {
              id: args.id,
            },
            returning: true,
          }
        );

        const quotationItem = await QuotationItems.findOne({ where: { id: order[1][0].quotation_item_id } });

        if (quotationItem) {
          const quotation = await Quotation.findOne({ where: { id: quotationItem.quotation_id } });

          if(quotation){
            await ProjectSupplier.update(
              {
                status_id: 8,
              },
              {
                where: {
                  project_id: quotation.project_id,
                  supplier_id: quotation.supplier_id
                },
              }
            );

            await Project.update(
              {
                status: 'Order Delivered',
              },
              {
                where: {
                  id: order[1][0].project_id,
                },
              }
            );
          }
        }

        return {
          path: 'update-order',
          message: 'Order updated successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'update-order',
          message: 'Order update failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
