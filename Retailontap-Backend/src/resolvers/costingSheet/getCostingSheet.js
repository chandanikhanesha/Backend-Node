import { CostingSheet } from "../../../models";

export default {
  Query: {
    costing_sheets: async () => {
      return CostingSheet.findAll();
    },
  },
};
