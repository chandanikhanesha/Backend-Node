import { Product, ProductItem, Project } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    productItemsByProjectId: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        project_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-product-items', 'Validation failed!', 422, errors);
      }
      const project = await Project.findOne({
        where: {
          id: args.project_id,
        },
        include: [
          {
            model: Product,
            as: 'product',
            include: [
              {
                model: ProductItem,
                as: 'items',
                attributes: ['id', 'style', 'colour', 'size', 'product_id'],
              },
            ],
          },
        ],
      });
      if (project && project.product) {
        return {
          id: project.id,
          items: project.product.items,
        };
      }
      return [];
    },
  },
};
