import { response, validateForm } from '../../utils/functions';
import { Order, Project, ProjectSupplier, Quotation, QuotationItems } from '../../../models';

export default {
  Mutation: {
    createOrder: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'required|integer',
        quotation_item_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('create-order', 'Validation failed!', 422, errors);
      }
      try {
        await Order.create({
          quotation_item_id: args.quotation_item_id,
          project_id: args.project_id,
        });

        const quotationItem = await QuotationItems.findOne({ where: { id: args.quotation_item_id } });

        if (quotationItem) {
          const quotation = await Quotation.findOne({ where: { id: quotationItem.quotation_id } });

          if (quotation) {
            await ProjectSupplier.update(
              {
                status_id: 7,
              },
              {
                where: {
                  project_id: args.project_id,
                  supplier_id: quotation.supplier_id
                },
              }
            );

            await Project.update(
              {
                status: 'Order Requested',
              },
              {
                where: {
                  id: args.project_id,
                },
              }
            );
          }
        }
        return {
          path: 'create-order',
          message: 'Order created successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'create-order',
          message: 'Creating order failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
