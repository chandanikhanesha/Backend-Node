import { Product } from '../../../models';
import { response, validateForm } from '../../utils/functions';

export default {
  Mutation: {
    addView: async (parent, args, context) => {
      let errors = null;
      const validationRule = {
        product_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('add-view', 'Validation failed!', 422, errors);
      }
      try {
        await Product.increment('views', {
          by: 1,
          where: {
            id: args.product_id,
          },
        });
        return response('add-view', 'Add View successfully', 200, null);
      } catch (e) {
        return response('add-view', 'Add View failed!', 400, null);
      }
    },
  },
};
