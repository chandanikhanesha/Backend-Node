import * as StripeService from '../../utils/service/StripeService';

export default {
  Query: {
    paymentMethods: async (parent, args, context) => {
      if (context.authUser && context.authUser.stripe_customer_id) {
        const paymentMethods = await StripeService.getPaymentMethods(
          context.authUser.stripe_customer_id
        );

        return paymentMethods.data;
      } else {
        return null;
      }
    },
  },
};
