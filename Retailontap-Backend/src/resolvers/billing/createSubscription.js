import * as StripeService from '../../utils/service/StripeService';
import * as BillingService from '../../utils/service/BillingService';
import * as UserService from '../../utils/service/UserService';
import { validateForm } from '../../utils/functions';
import { Price, Subscription, User } from '../../../models';
import stripe from '../../utils/stripe';

export default {
  Mutation: {
    createSubscription: async (parent, args, context) => {
      let strype_customer_id = null;
      let errors = null;

      const validationRule = {
        // payment_method_id: 'required|string',
        license_id: 'required|string',
        price_id: 'required|string',
        quantity: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return {
          path: 'create-subscription',
          message: 'Validation failed!',
          code: 422,
          errors: errors,
          subscription: null,
        };
      }

      //check if the user already have customer_id in stripe
      if (context.authUser.stripe_customer_id) {
        strype_customer_id = context.authUser.stripe_customer_id;
        const user = await User.findOne({
          where: { id: context.authUser.id },
          include: [
            {
              model: Subscription,
              as: 'subscriptions',
              where: {
                  license_id: args.license_id,
                  status:'active'
              },
            },
          ],
        });
        if (user && user.subscriptions) {
          return {
            path: 'create-subscription',
            message: 'You already have subscription please update it.',
            code: 400,
            errors: null,
            subscription: null,
          };
        }
      } else {
        return {
          path: 'create-subscription',
          message: 'You have not customer id',
          code: 400,
          errors: null,
          subscription: null,
        };
      }

      const price = await Price.findOne({
        where: {
          price_id: args.price_id,
          license_id: args.license_id,
        },
      });

      if (!price) {
        return {
          path: 'create-subscription',
          message: 'You have selected wrong price',
          code: 400,
          errors: null,
          subscription: null,
        };
      }

      //if user have not payment method attach payment method
      if (!context.authUser.payment_method_id) {
        if (args.payment_method_id) {
          //attach payment method to the customer
          const paymentMethod = await StripeService.paymentMethodsAttach(
            args.payment_method_id,
            strype_customer_id
          );

          if (!paymentMethod) {
            return {
              path: 'create-subscription',
              message: 'Attach payment method failed',
              code: 400,
              errors: null,
              subscription: null,
            };
          }

          // update customer
          const customerUpdate = await stripe.customers.update(
            strype_customer_id,
            {
              invoice_settings: {
                default_payment_method: paymentMethod.id,
              },
            }
          );

          if (customerUpdate) {
            await context.authUser.update({
              payment_method_id: paymentMethod.id,
            });
          }
        } else {
          return {
            path: 'create-subscription',
            message: 'Payment method id is required',
            code: 400,
            errors: null,
            subscription: null,
          };
        }
      } else {
        if (args.payment_method_id && args.payment_method_id !== context.authUser.payment_method_id) {
          //detach current default payment method
          const detachedPaymentMethod = await StripeService.paymentMethodsDetach(
            context.authUser.payment_method_id          
          );

          //attach payment method to the customer
          const paymentMethod = await StripeService.paymentMethodsAttach(
            args.payment_method_id,
            strype_customer_id
          );

          if (!paymentMethod) {
            return {
              path: 'create-subscription',
              message: 'Attach payment method failed',
              code: 400,
              errors: null,
              subscription: null,
            };
          }

          // update customer
          const customerUpdate = await stripe.customers.update(
            strype_customer_id,
            {
              invoice_settings: {
                default_payment_method: paymentMethod.id,
              },
            }
          );

          if (customerUpdate) {
            await context.authUser.update({
              payment_method_id: paymentMethod.id,
            });
          }
        }
      }

      //create subscription object
      const subscriptionDetails = {
        customer: strype_customer_id,
        items: [
          {
            // plan: args.license_id,
            price: args.price_id,
            quantity: args.quantity,
          },
        ],
        expand: ['latest_invoice.payment_intent', 'plan.product'],
      };

      // if discount exist add to subscription object
      if (price.coupon_id) {
        subscriptionDetails.coupon = price.coupon_id;
      }

      // create subscription on stripe
      const subscription = await StripeService.createSubscription(
        subscriptionDetails
      );

      if (!subscription) {
        return {
          path: 'create-subscription',
          message: 'Subscription failed',
          code: 400,
          errors: null,
          subscription: null,
        };
      } else {
        // store subscription details in db
        await BillingService.createSubscription(subscription);

        if (
          subscription.plan.product.id === process.env.STANDARD_LICENSE_ID &&
          subscription.status === 'active'
        ) {
          await UserService.activateUsers(
            subscription.customer,
            subscription.quantity +
            parseInt(process.env.FREE_STANDARD_LICENSE_COUNT)
          );
        }
      }

      return {
        path: 'create-subscription',
        message: 'Subscription created successfully',
        code: 200,
        errors: null,
        subscription: subscription,
      };
    },
  },
};
