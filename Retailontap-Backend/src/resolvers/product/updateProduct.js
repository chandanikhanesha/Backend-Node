import { response, validateForm } from '../../utils/functions';
import { Product } from '../../../models';
import * as ProductService from '../../utils/service/ProductService';
import * as BaseService from '../../utils/service/BaseService';

export default {
  Mutation: {
    updateProduct: async (parent, args, context) => {
      let errors = null;

      args.materials = JSON.parse(JSON.stringify(args.materials));
      args.images = JSON.parse(JSON.stringify(args.images));
      args.hashtags = JSON.parse(JSON.stringify(args.hashtags));
      args.colours = JSON.parse(JSON.stringify(args.colours));

      const validationRule = {
        id: 'required|integer',
        name: 'required|string',
        description: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('update-product', 'Validation failed!', 422, errors);
      }

      const product = await Product.update(
        {
          name: args.name,
          description: args.description,
        },
        {
          where: {
            id: args.id,
            organisation_id: context.authUser.organisation[0].id,
          },
          returning: true,
        }
      );
      if (product[0] !== 0) {
        await BaseService.associateMaterials(
          product[1][0],
          args.materials,
          'Product',
          'update'
        );
        await BaseService.associateImages(
          product,
          args.images,
          'products',
          'Product'
        );
        await BaseService.associateHashtags(
          product[1][0],
          args.hashtags,
          'Product',
          'update'
        );
        await BaseService.associateColours(
          product[1][0],
          args.colours,
          'Product',
          'update'
        );

        return response(
          'update-product',
          'Product updated successfully!',
          200,
          null
        );
      }
      return response('update-product', 'Product update failed', 200, null);
    },
  },
};
