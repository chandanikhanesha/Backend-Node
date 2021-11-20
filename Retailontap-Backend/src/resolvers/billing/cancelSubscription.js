import { response, validateForm } from '../../utils/functions';
import * as StripeService from '../../utils/service/StripeService';
import * as BillingService from '../../utils/service/BillingService';
import { Subscription } from '../../../models';

export default {
  Mutation: {
    cancelSubscription: async (parent, args) => {
      let errors = null;

      const validationRule = {
        subscription_id: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'cancel-subscription',
          'Validation failed!',
          422,
          errors
        );
      }

      const retriveSubscription = await Subscription.findOne({
        where: {
          subscription_id: args.subscription_id                    
        },
      });

      const canceledSubscription = await StripeService.cancelSubscription(
        args.subscription_id
      );

      if (!canceledSubscription) {
        return {
          path: 'cancel-subscription',
          message: 'Cancel subscription failed',
          code: 400,
          errors: null,
          subscription: null,
        };
      }
      
      await BillingService.updateSubscription(
        retriveSubscription,
        canceledSubscription
      );

      return {
        path: 'cancel-subscription',
        message: 'Subscription canceled successfully',
        code: 200,
        errors: null,
        subscription: canceledSubscription,
      };
    },
  },
};