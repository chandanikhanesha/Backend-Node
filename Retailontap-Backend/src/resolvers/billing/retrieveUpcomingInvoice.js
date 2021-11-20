import { response, validateForm } from '../../utils/functions';
import stripe from '../../utils/stripe';
import { Price } from '../../../models';

export default {
  Mutation: {
    retrieveUpcomingInvoice: async (parent, args) => {
      let errors = null;
      let params = {};
      let subscription;
      let data = {};

      const validationRule = {
        customer_id: 'required|string',
        price_id: 'required|string',
        quantity: 'required|integer',
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

      const price = await Price.findOne({
        where: {
          price_id: args.price_id,
        },
      });

      const price_id = args.price_id;
      const quantity = args.quantity;
      const subscription_id = args.subscription_id;

      params['customer'] = args.customer_id;

      if (subscription_id !== null) {
        params['subscription'] = subscription_id;
        subscription = await stripe.subscriptions.retrieve(subscription_id);

        const current_price = subscription.items.data[0].price.id;

        if (current_price === price_id) {
          params['subscription_items'] = [
            {
              id: subscription.items.data[0].id,
              quantity: quantity,
            },
          ];
        } else {
          params['subscription_items'] = [
            {
              id: subscription.items.data[0].id,
              deleted: true,
            },
            {
              price: price_id,
              quantity: quantity,
            },
          ];
        }
      } else {
        params['subscription_items'] = [
          {
            price: price_id,
            quantity: quantity,
          },
        ];
      }

      // if discount exist add to subscription object
      if (price && price.coupon_id) {
        params.coupon = price.coupon_id;
      }

      const invoice = await stripe.invoices.retrieveUpcoming(params);

      if (subscription_id != null) {
        const current_period_end = subscription.current_period_end;
        let immediate_total = 0;
        let next_invoice_sum = 0;

        invoice.lines.data.forEach((invoiceLineItem) => {
          if (invoiceLineItem.period.end === current_period_end) {
            immediate_total += invoiceLineItem.amount;
          } else {
            next_invoice_sum += invoiceLineItem.amount;
          }
        });

        data = {
          immediate_total: immediate_total,
          next_invoice_sum: next_invoice_sum,
          invoice: invoice,
        };
      } else {
        data = {
          invoice: invoice,
        };
      }

      return {
        path: 'retrieve-upcoming-invoice',
        message: 'Upcominc Invoice',
        code: 200,
        errors: null,
        invoice: data.invoice,
      };
    },
  },
};
