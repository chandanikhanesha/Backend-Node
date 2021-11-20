import { response, validateForm } from "../../utils/functions";
import {
  Project,
  ProjectSupplier,
  Quotation,
  QuotationItems,
} from "../../../models";

export default {
  Mutation: {
    createQuotation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        supplier_id: "required|integer",
        project_id: "required|integer",
        product_item_id: "required|integer",
        quantity: "required|integer",
        price: "required|integer",
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response("create-quotation", "Validation failed!", 422, errors);
      }

      let conditionQuotation;
      const type = context.authUser.organisation[0].organisation_type;

      if (type === "retailer") {
        conditionQuotation = {
          retailer_id: context.authUser.id,
          project_id: args.project_id,
        };
      } else {
        conditionQuotation = {
          supplier_id: context.authUser.id,
          project_id: args.project_id,
        };
      }
      try {
        let quotation = await Quotation.findOne({
          where: conditionQuotation,
        });

        if (!quotation) {
          quotation = await Quotation.create({
            retailer_id: context.authUser.id,
            supplier_id: args.supplier_id,
            project_id: args.project_id,
            total: 0,
            quotation_type: "DetailQuotation",
            price: args.price,
            product_style: args.product_style,
            colour: args.colour,
            size: args.size,
          });

          await ProjectSupplier.update(
            {
              status_id: 5,
            },
            {
              where: {
                project_id: args.project_id,
                supplier_id: args.supplier_id,
              },
            }
          );

          await Project.update(
            {
              status: "Quotation Requested",
            },
            {
              where: {
                id: args.project_id,
              },
            }
          );
        }
        await QuotationItems.create({
          product_item_id: args.product_item_id,
          quotation_id: quotation.id,
          quantity: args.quantity,
        });
        const cost = args.quantity * args.price;
        quotation.update({ total: quotation.total + cost });
        return {
          path: "create-quotation",
          message: "Quotation created  successfully!",
          code: 200,
          errors: null,
        };
      } catch (e) {
        console.log("errorrrr", e, "erororrrrrrr");
        return {
          path: "create-quotation",
          message: "Quotation create failed!",
          code: 400,
          errors: e,
        };
      }
    },
  },
};
