import * as StripeService from '../../utils/service/StripeService';

export default {
  Query: {
    invoices: async (parent, args, context) => {
      if (context.authUser && context.authUser.stripe_customer_id) {
        const invoices = await StripeService.getInvoices(
          context.authUser.stripe_customer_id
        );
        return invoices.data;
      } else {
        return null;
      }
    },
  },
};
