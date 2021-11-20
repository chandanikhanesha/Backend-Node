import * as StripeService from '../../utils/service/StripeService';
import * as BillingService from '../../utils/service/BillingService';
import { response, validateForm } from '../../utils/functions';
import { Price, Subscription } from '../../../models';
import stripe from '../../utils/stripe';

export default {
  Mutation: {
    updateSubscription: async (parent, args, context) => {
      let currentDate = new Date();
      let startDate = 0;
      let endDate = 0;
      let stripe_customer_id = null;      
      let errors = null;

      const validationRule = {
        subscription_id: 'required|string',
        license_id: 'required|string',
        price_id: 'required|string',
        quantity: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-subscription',
          'Validation failed!',
          422,
          errors
        );
      }

      if (args.payment_method_id && args.payment_method_id !== context.authUser.payment_method_id) {
        //detach current default payment method             
        const detachedPaymentMethod = await StripeService.paymentMethodsDetach(
          context.authUser.payment_method_id         
        );
       
        //attach payment method to the customer
        stripe_customer_id = context.authUser.stripe_customer_id;
        const paymentMethod = await StripeService.paymentMethodsAttach(
          args.payment_method_id,
          stripe_customer_id
        );
        
        if (!paymentMethod) {
          return {
            path: 'update-subscription',
            message: 'Attach payment method failed',
            code: 400,
            errors: null,
            subscription: null,
          };
        }

        // update customer
        const customerUpdate = await stripe.customers.update(
          stripe_customer_id,
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

      //check if the user already setup billing method
      if (context.authUser.payment_method_id) {
        // retrive subscription from stripe
        const retriveSubscription = await Subscription.findOne({
          where: {
            subscription_id: args.subscription_id,
            license_id: args.license_id,
          },
        });

        if (!retriveSubscription) {
          return response(
            'update-subscription',
            'Subscription not found!',
            400,
            null
          );
        }

        const price = await Price.findOne({
          where: {
            price_id: args.price_id,
            license_id: args.license_id,
          },
        });

        if (!price) {
          return response(
            'update-subscription',
            'You have selected wrong price',
            400,
            null
          );
        }

        if (retriveSubscription.billing_cycle_anchor < (currentDate.getTime()/1000)) {         
          startDate = retriveSubscription.current_period_end;
        } else {
          let date = new Date(retriveSubscription.billing_cycle_anchor*1000); 
          const currentPlanPriceDetails = await StripeService.getPrice(retriveSubscription.price_id);
          
          if(currentPlanPriceDetails){
            let interval = currentPlanPriceDetails.recurring.interval;
            let interval_count = currentPlanPriceDetails.recurring.interval_count;
            let newDate = null;
           
            if (interval === 'day') {
              newDate = new Date(date.setDate(date.getDate() + interval_count));              
            } else if (interval === 'month') {
              newDate = new Date(date.setMonth(date.getMonth() + interval_count));            
            } else if (interval === 'year') {
              newDate = new Date(date.setFullYear(date.getFullYear() + interval_count));            
            }
            
            if(newDate!==null){
              startDate = newDate.getTime()/1000;              
            }           
          }                 
        }

        //create subscription object
        const currentSubscriptionDetails = {
            cancel_at: startDate
        };
       
        // update current subscription on stripe
        const updatedSubscription = await StripeService.updateSubscription(
          args.subscription_id,
          currentSubscriptionDetails
        );

        if (updatedSubscription) {
          response(
            'update-subscription',
            'Update subscription failed',
            400,
            null
          );
        }

        if (updatedSubscription) {         
         // create new subscription object
         const subscriptionDetails = {
           trial_end:retriveSubscription.current_period_end,                    
           customer: context.authUser.stripe_customer_id,
           proration_behavior:'none',
           items: [
            {             
             price: args.price_id,
             quantity: args.quantity,
            },
           ],         
           expand: ['latest_invoice.payment_intent', 'plan.product'],
         };

         if (args.price_id !== retriveSubscription.price_id) {
           // if discount exist add to subscription object
           if (price.coupon_id) {
             subscriptionDetails.coupon = price.coupon_id;
           }
         }

         // create new subscription on stripe
         const subscription = await StripeService.createSubscription(
           subscriptionDetails
         );

         if (!subscription) {
           await StripeService.updateSubscription(
             args.subscription_id,
             {cancel_at_period_end:false, cancel_at: null}
           );

           return {
            path: 'update-subscription',
            message: 'Subscription failed',
            code: 400,
            errors: null,
            subscription: null,
           };
         } else {
          // store subscription details in db
          const newPlanPriceDetails = await StripeService.getPrice(args.price_id);

          if(newPlanPriceDetails){
            let date = new Date(subscription.billing_cycle_anchor*1000);             
            let interval = newPlanPriceDetails.recurring.interval;
            let interval_count = newPlanPriceDetails.recurring.interval_count;
            let newDate = null;
           
            if (interval === 'day') {
              newDate = new Date(date.setDate(date.getDate() + interval_count));              
            } else if (interval === 'month') {
              newDate = new Date(date.setMonth(date.getMonth() + interval_count));            
            } else if (interval === 'year') {
              newDate = new Date(date.setFullYear(date.getFullYear() + interval_count));            
            }
            
            if(newDate!==null){              
              endDate = newDate.getTime()/1000;
            }           
          }   

          subscription.current_period_start = subscription.billing_cycle_anchor;
          subscription.current_period_end = endDate;

          await BillingService.createSubscription(subscription);          
         }

         await BillingService.updateSubscription(
           retriveSubscription,
           updatedSubscription
         );
         return {
           path: 'update-subscription',
           message: 'Update subscription is done.',
           code: 200,
           errors: null,
           subscription: subscription,
         };
        }
      } else {
        return response(
          'update-subscription',
          'Please setup billing method.',
          400,
          null
        );
      }
    },
  },
};
