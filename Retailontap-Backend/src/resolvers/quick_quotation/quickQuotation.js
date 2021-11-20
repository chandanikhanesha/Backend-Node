import { response, validateForm } from "../../utils/functions";
import { Quotation } from "../../../models";
import { Project, ProjectSupplier, QuotationItems } from "../../../models";

export default {
  Mutation: {
    createQuickQuotation: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        total_units: "required|integer",
        supplier_id: "required|integer",
        project_id: "required|integer",
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          "create-quick-quotation",
          "Validation failed!",
          422,
          errors
        );
      }
      let conditionQuotation;
      const type = context.authUser.organisation[0].organisation_type;

      // if (type === "retailer") {
      //   conditionQuotation = {
      //     retailer_id: context.authUser.id,
      //     project_id: args.project_id,
      //   };
      // } else {
      //   conditionQuotation = {
      //     supplier_id: context.authUser.id,
      //     project_id: args.project_id,
      //   };
      // }
      try {
        // let quotation = await Quotation.findOne({
        //   where: conditionQuotation,
        // });
        // if (!quotation) {
        await Quotation.create({
          retailer_id: context.authUser.id,
          supplier_id: args.supplier_id,
          project_id: args.project_id,
          total_units: args.total_units,
          description: args.description,
          quotation_type: "Quick Quotation",
        });

        return {
          path: "create-quick-quotation",
          message: "QuickQuotation created successfully!",
          code: 200,
          errors: null,
        };
      } catch (e) {
        console.log(e);
        return {
          path: "create-quick-quotation",
          message: "Creating QuickQuotation failed!",
          code: 400,
          errors: e,
        };
      }
    },
  },
};
