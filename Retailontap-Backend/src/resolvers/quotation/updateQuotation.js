import { response, validateForm } from '../../utils/functions';
import { Project, ProjectSupplier, Quotation, QuotationItems } from '../../../models';

export default {
  Mutation: {
    updateQuotation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        item_id: 'required|integer',
        product_item_id: 'integer',
        quantity: 'integer',
        is_submited: 'boolean',
        unit_price: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('update-quotation', 'Validation failed!', 422, errors);
      }
      try {
        const item = await QuotationItems.findOne({
          where: {
            id: args.item_id,
          },
        });

        if (args.quantity && item) {
          const oldCost = item.quantity * args.unit_price;
          const newCost = args.quantity * args.unit_price;
          const newTotal = newCost - oldCost;
          await Quotation.increment('total', {
            by: newTotal,
            where: {
              id: item.quotation_id,
            },
          });
        }
        item.update({
          product_item_id: args.product_item_id,
          quantity: args.quantity,
        });
        if (args.is_submited) {
          const quotation = await Quotation.update(
            {
              is_submited: args.is_submited,
            },
            {
              where: {
                id: item.quotation_id,
              },
              returning: true,
            }
          );

          await ProjectSupplier.update(
            {
              status_id: 6,
            },
            {
              where: {
                project_id: args.project_id,
                supplier_id:args.supplier_id
              },
            }
          );

          await Project.update(
            {
              status: 'Quotation Received',
            },
            {
              where: {
                id: quotation[1][0].ProjectId,
              },
            }
          );
        }
        return {
          path: 'update-quotation',
          message: 'Quotation updated  successfully!',
          code: 200,
          errors: null,
        };
      } catch (e) {
        return {
          path: 'update-quotation',
          message: 'Quotation update failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
