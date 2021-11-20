import { response, validateForm } from "../../utils/functions";
import { CostingSheet } from "../../../models";

export default {
  Mutation: {
    createCostingSheet: async (parent, args, context) => {
      console.log("context", context);
      let errors = null;
      console.log("in createCostingSheet");
      const validationRule = {
        project_id: "required|integer",
        style_number: "required|integer",
        packing_cost: "required|integer",
        overheads: "required|integer",
        total_garment: "required|integer",
        total_packing_cost: "required|integer",
        total_overheads: "required|integer",
        total_cost: "required|integer",
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          "create-costingSheet",
          "Validation failed!",
          422,
          errors
        );
      }
      try {
        await CostingSheet.create({
          user_id: context.authUser.id,
          project_id: args.project_id,
          style_number: args.style_number,
          supplier_name: args.supplier_name,
          packing_cost: args.packing_cost,
          overheads: args.overheads,
          fabric_cost: args.fabric_cost,
          usage: args.usage,
          total_fabric: args.total_fabric,
          cm_cost: args.cm_cost,
          garment_add_ons: args.garment_add_ons,
          product_trim_cost: args.product_trim_cost,
          total_garment: args.total_garment,
          total_packing_cost: args.total_packing_cost,
          total_overheads: args.total_overheads,
          total_cost: args.total_cost,
        });

        return {
          path: "create-costing-Sheet",
          message: "CostingSheet created successfully!",
          code: 200,
          errors: null,
        };
      } catch (e) {
        console.log(e);
        return {
          path: "create-costing-Sheet",
          message: "Creating CostingSheet failed!",
          code: 400,
          errors: e,
        };
      }
    },
  },
};
