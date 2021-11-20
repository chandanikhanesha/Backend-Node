import { response, validateForm } from '../../utils/functions';
import * as StripeService from '../../utils/service/StripeService';

export default {
  Mutation: {
    retrievePaymentMethod: async (parent, args) => {
      let errors = null;

      const validationRule = {
        payment_method_id: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'create-subscription',
          'Validation failed!',
          422,
          errors
        );
      }

      const paymentMethod = await StripeService.retrievePaymentMethod(
        args.payment_method_id
      );

      return {
        path: 'retrieve-payment-method',
        message: 'Retrieve payment method',
        code: 200,
        errors: null,
        paymentMethod: paymentMethod,
      };
    },
  },
};
