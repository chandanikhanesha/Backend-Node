import { response, validateForm } from '../../utils/functions';
import * as StripeService from '../../utils/service/StripeService';

export default {
  Mutation: {
    changeDefaultPaymentMethod: async (parent, args, context) => {
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

      if (context.authUser.stripe_customer_id) {
        //detach current default payment method
        if(context.authUser.payment_method_id){
          const detachedPaymentMethod = await StripeService.paymentMethodsDetach(
            context.authUser.payment_method_id          
          );
        }
        //attach payment method to the customer
        const paymentMethodDetails = await StripeService.paymentMethodsAttach(
          args.payment_method_id,
          context.authUser.stripe_customer_id
        );

        if (!paymentMethodDetails) {
          return {
            path: 'change-default-payment-method',
            message: 'Attach payment method failed',
            code: 400,
            errors: null,
            subscription: null,
          };
        }

        const data = {
          invoice_settings: {
            default_payment_method: args.payment_method_id,
          },
        };
        const customer = await StripeService.updateCustomer(
          context.authUser.stripe_customer_id,
          data
        );

        let paymentMethod = null;
        if (
          customer &&
          customer.sources &&
          customer.sources.data &&
          customer.sources.data[0]
        ) {         
          paymentMethod = customer.sources.data[0];          
        }

        await context.authUser.update({
          payment_method_id: paymentMethodDetails.id,
        });

        return {
          path: 'change-default-payment-method',
          message: 'Default payment method changed successfully',
          code: 200,
          errors: null,
          paymentMethod: paymentMethod,
        };
      } else {
        return {
          path: 'change-default-payment-method',
          message: 'You have not stripe customer id',
          code: 400,
          errors: null,
          paymentMethod: null,
        };
      }
    },
  },
};
