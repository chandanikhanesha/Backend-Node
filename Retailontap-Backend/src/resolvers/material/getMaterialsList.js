import { Material } from '../../../models';

export default {
  Query: {
    materials: async () => {
      return Material.findAll();
    },
  },
};
