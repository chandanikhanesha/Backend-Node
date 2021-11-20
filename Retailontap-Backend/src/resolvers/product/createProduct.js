import { response, validateForm } from '../../utils/functions';
import { Product } from '../../../models';
import * as ProductService from '../../utils/service/ProductService';
import * as BaseService from '../../utils/service/BaseService';

export default {
  Mutation: {
    createProduct: async (parent, args, context) => {
      let errors = null;

      args.materials = JSON.parse(JSON.stringify(args.materials));
      args.images = JSON.parse(JSON.stringify(args.images));
      args.hashtags = JSON.parse(JSON.stringify(args.hashtags));
      args.colours = JSON.parse(JSON.stringify(args.colours));

      const validationRule = {
        name: 'required|string',
        description: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('create-product', 'Validation failed!', 422, errors);
      }

      let data = args;
      data.user_id = context.authUser.id;
      data.organisation_id = context.authUser.organisation[0].id;

      const product = await Product.create(data);

      if (product) {
        await BaseService.associateMaterials(
          product,
          args.materials,
          'Product',
          'create'
        );
        await BaseService.associateImages(
          product,
          args.images,
          'products',
          'Product'
        );
        await BaseService.associateHashtags(
          product,
          args.hashtags,
          'Product',
          'create'
        );
        await BaseService.associateColours(
          product,
          args.colours,
          'Product',
          'create'
        );
      }

      return response(
        'create-product',
        'Product created successfully',
        200,
        null
      );
    },
  },
};
