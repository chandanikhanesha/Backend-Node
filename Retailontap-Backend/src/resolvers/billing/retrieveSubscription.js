import { response, validateForm } from '../../utils/functions';
import * as StripeService from '../../utils/service/StripeService';

export default {
  Mutation: {
    retrieveSubscription: async (parent, args) => {
      let errors = null;

      const validationRule = {
        subscription_id: 'required|string',
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

      const subscription = await StripeService.getSubscription(
        args.subscription_id
      );

      if (!subscription) {
        return {
          path: 'create-subscription',
          message: 'Get subscription failed',
          code: 400,
          errors: null,
          subscription: null,
        };
      }

      const upcomingInvoice = await StripeService.retrieveUpcomingInvoices(
        args.subscription_id
      );

      if (!upcomingInvoice) {
        return {
          path: 'create-subscription',
          message: 'Get Upcoming Invoice Failed',
          code: 400,
          errors: null,
          subscription: null,
        };
      }

      const data = {
        card:
          subscription.customer.invoice_settings.default_payment_method.card,
        product_description: subscription.plan.product.name,
        current_price: subscription.plan.id,
        current_quantity: subscription.items.data[0].quantity,
        latest_invoice: subscription.latest_invoice,
        upcoming_invoice: upcomingInvoice,
        start_date:subscription.current_period_start,
        end_date:subscription.current_period_end,
        status:subscription.status
      };

      return {
        path: 'create-subscription',
        message: 'Subscription details',
        code: 200,
        errors: null,
        subscription: data,
      };
    },
  },
};
