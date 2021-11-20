import * as ProductService from '../../utils/service/ProductService';

export default {
  Query: {
    products: async (parent, args, context) => {
      const condition = {
        product: {
          organisation_id: context.authUser.organisation[0].id,
          user_id: context.authUser.id,
        },
      };
      const products = await ProductService.getProducts({ condition });
      return products;
    },
  },
};
